import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DetailsUiMode, Monitor, MonitorEvent, NewMonitor } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
import { monitorApi } from './monitorApi';
import { monitorEventsApi } from '../monitor-events/monitorEventsApi';

export const monitorsAdapter = createEntityAdapter<Monitor>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const monitorEventsAdapter = createEntityAdapter<MonitorEvent>({
  sortComparer: (a, b) => +new Date(b.date) - +new Date(a.date),
})

export const fetchAllMonitors = createAsyncThunk(
  'monitors/fetchAllStatus',
  async () => {
    return await monitorApi.findAll();
  }
);

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
  'monitors/fetchSelectedMonitorEventsStatus',
  async (monitorId: string) => {
    const monitorEvents = await monitorEventsApi.findByMonitorId(monitorId);
    return {
      monitorId,
      monitorEvents: monitorEvents
    }
  }
);

export const deleteMonitorThenShowDetailsForAnyMonitor = createAsyncThunk(
  'monitors/deleteMonitorThenShowDetailsForAnyMonitorStatus',
  async (id: string, thunkApi) => {
    await monitorApi.delete(id);
    thunkApi.dispatch(deleteMonitorFulfilled(id));
    await thunkApi.dispatch(showMonitorDetailsForAnyMonitor());
    return id;
  }
);

export const createMonitorThenShowItsDetails = createAsyncThunk(
  'monitors/createMonitorThenShowItsDetailsStatus',
  async (monitor: NewMonitor, thunkApi) => {
    const newMonitor = await monitorApi.create(monitor);
    thunkApi.dispatch(createMonitorFulfilled(newMonitor));
    await thunkApi.dispatch(showMonitorDetails(newMonitor.id));
    return newMonitor;
  }
);

export const patchMonitorThenShowItsDetails = createAsyncThunk(
  'monitors/patchMonitorThenShowItsDetailsStatus',
  async (monitor: Monitor, thunkApi) => {
    const patchedMonitor = await monitorApi.updateById(monitor.id, monitor);
    thunkApi.dispatch(patchMonitorFulfilled(patchedMonitor));
    await thunkApi.dispatch(showMonitorDetails(monitor.id));
    return patchedMonitor;
  }
);

export const monitorsSlice = createSlice({
  name: 'monitors',
  initialState: {
    monitors: monitorsAdapter.getInitialState(),
    monitorListLoadingStatus: OperationStatus.Loading,
    mutatingMonitorStatus: OperationStatus.Done,
    mutatingMonitorId: null as string | null,
    selectedMonitorId: null as string | null,
    selectedMonitorEvents: monitorEventsAdapter.getInitialState(),
    detailsUiMode: DetailsUiMode.View,
    detailsLoadStatus: OperationStatus.Loading,
  },
  reducers: {
    showCreateMonitorForm: (state) => {
      state.detailsUiMode = DetailsUiMode.Create;
      state.selectedMonitorId = null;
      state.selectedMonitorEvents = monitorEventsAdapter.removeAll(state.selectedMonitorEvents);
    },
    showMonitorEditForm: (state, action: PayloadAction<string>) => {
      state.detailsUiMode = DetailsUiMode.Edit;
      state.selectedMonitorId = action.payload;
      state.selectedMonitorEvents = monitorEventsAdapter.removeAll(state.selectedMonitorEvents);
    },
    showMonitorDeleteForm: (state, action: PayloadAction<string>) => {
      state.detailsUiMode = DetailsUiMode.Delete;
      state.selectedMonitorId = action.payload;
      state.selectedMonitorEvents = monitorEventsAdapter.removeAll(state.selectedMonitorEvents);
    },
    createMonitorFulfilled: (state, action: PayloadAction<Monitor>) => {
      monitorsAdapter.addOne(state.monitors, action.payload);
    },
    patchMonitorFulfilled: (state, action: PayloadAction<Monitor>) => {
      monitorsAdapter.updateOne(state.monitors, { id: action.payload.id, changes: action.payload });
    },
    deleteMonitorFulfilled: (state, action: PayloadAction<string>) => {
      monitorsAdapter.removeOne(state.monitors, action);
    }
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
      fetchAllMonitors.fulfilled,
      (state, action: PayloadAction<Monitor[]>) => {
        monitorsAdapter.setAll(state.monitors, action);
        state.monitorListLoadingStatus = OperationStatus.Done;
      })
    .addCase(
      fetchAllMonitors.rejected,
      (state) => {
        state.monitorListLoadingStatus = OperationStatus.Error;
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
      (state, action: PayloadAction<{ monitorId: string, monitorEvents: MonitorEvent[] }>) => {
        if (state.selectedMonitorId === action.payload.monitorId) {
          state.detailsUiMode = DetailsUiMode.View;
          monitorEventsAdapter.setAll(state.selectedMonitorEvents, action.payload.monitorEvents);
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
  createMonitorFulfilled,
  patchMonitorFulfilled,
  deleteMonitorFulfilled,
  showMonitorDeleteForm,
  showMonitorEditForm,
  showCreateMonitorForm
} = monitorsSlice.actions;

export const monitorSelectors = monitorsAdapter.getSelectors<RootState>((state) => state.monitors.monitors);

export const getAllMonitors = (state: RootState): Monitor[] => monitorSelectors.selectAll(state);

export const getMonitorListLoadingStatus = (state: RootState) => state.monitors.monitorListLoadingStatus;

export const getMutatingMonitorStatus = (state: RootState) => state.monitors.mutatingMonitorStatus;

export const monitorsReducer = monitorsSlice.reducer;

export const getDetailsUiMode = (state: RootState) => state.monitors.detailsUiMode;

export const getSelectedMonitorId = (state: RootState): string | null => state.monitors.selectedMonitorId;

export const getSelectedMonitor = (state: RootState): Monitor | null =>
  monitorSelectors.selectAll(state).find(monitor => monitor.id === state.monitors.selectedMonitorId) || null;

const monitorEventSelectors = monitorEventsAdapter.getSelectors<RootState>((state) => state.monitors.selectedMonitorEvents);

export const getAllMonitorEvents = (state: RootState) => monitorEventSelectors.selectAll(state);

export const getMonitorDetailsLoadingStatus = (state: RootState) => state.monitors.detailsLoadStatus;

