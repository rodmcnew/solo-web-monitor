import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DetailsUiMode, Monitor, MonitorEventsData, NewMonitor } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
import { fetchMonitorEvents, fetchMonitorEventsIfNeeded, getMonitorEventsByMonitorId } from '../monitor-events/monitorEventsSlice';
import { createMonitor, patchMonitor, deleteMonitor, fetchAllMonitors, getAllMonitors, monitorSelectors } from '../monitor/monitorsSlice';

export const fetchMonitorsThenShowMonitorDetailsForAnyMonitor = createAsyncThunk(
  'monitors/showMonitorDetailsForAnyMonitorStatus',
  async (returned: undefined, thunkApi) => {
    await thunkApi.dispatch(fetchAllMonitors());
    await thunkApi.dispatch(showMonitorDetailsForAnyMonitor());
  }
);

export const showMonitorDetailsForAnyMonitor = createAsyncThunk(
  'monitors/showMonitorDetailsForAnyMonitorStatus',
  async (returned: undefined, thunkApi) => {
    const allMonitors = getAllMonitors(thunkApi.getState() as RootState);
    const selectedMonitorId = getSelectedMonitorId(thunkApi.getState() as RootState);
    const selectedMonitor = allMonitors.find(monitor => monitor.id === selectedMonitorId)
      || allMonitors.find(() => true)
      || null;
    if (selectedMonitor !== null) {
      await thunkApi.dispatch(showMonitorDetails(selectedMonitor.id));
    } else {
      await thunkApi.dispatch(showCreateMonitorForm());
    }
  }
);

export const showMonitorDetails = createAsyncThunk(
  'monitors/showMonitorDetailsStatus',
  async (monitorId: string, thunkApi) => {
    thunkApi.dispatch(fetchMonitorEventsIfNeeded(monitorId));
    return {
      monitorId
    }
  }
);

export const deleteMonitorThenShowDetailsForAnyMonitor = createAsyncThunk(
  'monitors/deleteMonitorThenShowDetailsForAnyMonitorStatus',
  async (id: string, thunkApi) => {
    await thunkApi.dispatch(deleteMonitor(id));
    await thunkApi.dispatch(showMonitorDetailsForAnyMonitor());
    return id;
  }
);

export const createMonitorThenShowItsDetails = createAsyncThunk(
  'monitors/createMonitorThenShowItsDetailsStatus',
  async (monitor: NewMonitor, thunkApi) => {
    const newMonitor = (await thunkApi.dispatch(createMonitor(monitor))).payload as Monitor;
    await thunkApi.dispatch(showMonitorDetails(newMonitor.id));
    return newMonitor;
  }
);

export const patchMonitorThenShowItsDetails = createAsyncThunk(
  'monitors/patchMonitorThenShowItsDetailsStatus',
  async (monitor: Monitor, thunkApi) => {
    const newMonitor = (await thunkApi.dispatch(patchMonitor(monitor))).payload as Monitor;
    await thunkApi.dispatch(showMonitorDetails(newMonitor.id));
    thunkApi.dispatch(fetchMonitorEvents(newMonitor.id)); // Fetch fresh uncached events
    return newMonitor;
  }
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    mutatingMonitorStatus: OperationStatus.Done,
    mutatingMonitorId: null as string | null,
    selectedMonitorId: null as string | null,
    detailsUiMode: DetailsUiMode.View,
    detailsLoadStatus: OperationStatus.Loading,
  },
  reducers: {
    showCreateMonitorForm: (state) => {
      state.detailsUiMode = DetailsUiMode.Create;
      state.selectedMonitorId = null;
    },
    showMonitorEditForm: (state, action: PayloadAction<string>) => {
      state.detailsUiMode = DetailsUiMode.Edit;
      state.selectedMonitorId = action.payload;
    },
    showMonitorDeleteForm: (state, action: PayloadAction<string>) => {
      state.detailsUiMode = DetailsUiMode.Delete;
      state.selectedMonitorId = action.payload;
    },
  },
  extraReducers: builder => builder
    .addCase(
      createMonitorThenShowItsDetails.pending,
      (state) => {
        state.mutatingMonitorId = null; //null means "creating monitor"
        state.mutatingMonitorStatus = OperationStatus.Loading;
      })
    .addCase(
      createMonitorThenShowItsDetails.fulfilled,
      (state) => {
        if (state.mutatingMonitorId === null) {
          state.mutatingMonitorStatus = OperationStatus.Done;
        }
      })
    .addCase(
      createMonitorThenShowItsDetails.rejected,
      (state) => {
        if (state.mutatingMonitorId === null) {
          state.mutatingMonitorStatus = OperationStatus.Error;
        }
      })
    .addCase(
      patchMonitorThenShowItsDetails.pending,
      (state, action) => {
        state.mutatingMonitorId = action.meta.arg.id;
        state.mutatingMonitorStatus = OperationStatus.Loading;
      })
    .addCase(
      patchMonitorThenShowItsDetails.fulfilled,
      (state, action: PayloadAction<Monitor>) => {
        if (state.mutatingMonitorId === action.payload.id) {
          state.mutatingMonitorStatus = OperationStatus.Done;
        }
      })
    .addCase(
      patchMonitorThenShowItsDetails.rejected,
      (state, action) => {
        if (state.mutatingMonitorId === action.meta.arg.id) {
          state.mutatingMonitorStatus = OperationStatus.Error;
        }
      })
    .addCase(
      deleteMonitorThenShowDetailsForAnyMonitor.pending,
      (state, action) => {
        state.mutatingMonitorId = action.meta.arg;
        state.mutatingMonitorStatus = OperationStatus.Loading;
      })
    .addCase(
      deleteMonitorThenShowDetailsForAnyMonitor.fulfilled,
      (state, action: PayloadAction<string>) => {
        if (state.mutatingMonitorId === action.payload) {
          state.mutatingMonitorStatus = OperationStatus.Done;
        }
      })
    .addCase(
      deleteMonitorThenShowDetailsForAnyMonitor.rejected,
      (state, action) => {
        if (state.mutatingMonitorId === action.meta.arg) {
          state.mutatingMonitorStatus = OperationStatus.Error;
        }
      })
    .addCase(
      showMonitorDetails.pending,
      (state, action) => {
        state.selectedMonitorId = action.meta.arg;
        state.detailsLoadStatus = OperationStatus.Loading
      })
    .addCase(
      showMonitorDetails.fulfilled,
      (state, action: PayloadAction<{ monitorId: string }>) => {
        if (state.selectedMonitorId === action.payload.monitorId) {
          state.detailsUiMode = DetailsUiMode.View;
          state.detailsLoadStatus = OperationStatus.Done
        }
      })
    .addCase(
      showMonitorDetails.rejected,
      (state) => {
        state.detailsLoadStatus = OperationStatus.Error
      }
    )
});

export const {
  showMonitorDeleteForm,
  showMonitorEditForm,
  showCreateMonitorForm
} = dashboardSlice.actions;

export const getMutatingMonitorStatus = (state: RootState) => state.dashboard.mutatingMonitorStatus;

export const getDetailsUiMode = (state: RootState) => state.dashboard.detailsUiMode;

export const getSelectedMonitorId = (state: RootState): string | null => state.dashboard.selectedMonitorId;

export const getSelectedMonitor = (state: RootState): Monitor | null =>
  monitorSelectors.selectAll(state).find(monitor => monitor.id === state.dashboard.selectedMonitorId) || null;

export const getMonitorDetailsLoadingStatus = (state: RootState) => state.dashboard.detailsLoadStatus;

export const getSelectedMonitorEventsData = (state: RootState): MonitorEventsData => {
  const selectedMonitorId = getSelectedMonitorId(state);
  return getMonitorEventsByMonitorId(state, selectedMonitorId);
}