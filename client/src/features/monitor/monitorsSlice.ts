import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Monitor, NewMonitor } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
import { showMonitorDetails, showMonitorDetailsForAnyMonitor } from '../monitor-details/monitorDetailsSlice';
import { monitorApi } from './monitorApi';

export const monitorsAdapter = createEntityAdapter<Monitor>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const fetchAllMonitors = createAsyncThunk(
  'monitors/fetchAllStatus',
  async () => {
    return await monitorApi.findAll();
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
  initialState: monitorsAdapter.getInitialState({
    monitorListLoadingStatus: OperationStatus.Loading,
    mutatingMonitorStatus: OperationStatus.Done,
    mutatingMonitorId: null as string | null
  }),
  reducers: {
    createMonitorFulfilled: (state, action: PayloadAction<Monitor>) => {
      monitorsAdapter.addOne(state, action.payload);
    },
    patchMonitorFulfilled: (state, action: PayloadAction<Monitor>) => {
      monitorsAdapter.updateOne(state, { id: action.payload.id, changes: action.payload });
    },
    deleteMonitorFulfilled: (state, action: PayloadAction<string>) => {
      monitorsAdapter.removeOne(state, action);
    }
  },
  extraReducers: builder => builder
    .addCase(
      createMonitorThenShowItsDetails.pending,
      (state, action) => {
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
      (state, action) => {
        if (state.mutatingMonitorId === null) {
          state.mutatingMonitorStatus = OperationStatus.Error;
        }
      })
    .addCase(
      fetchAllMonitors.fulfilled,
      (state, action: PayloadAction<Monitor[]>) => {
        monitorsAdapter.setAll(state, action);
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
});

export const { createMonitorFulfilled, patchMonitorFulfilled, deleteMonitorFulfilled } = monitorsSlice.actions;

// Can create a set of memoized selectors based on the location of this entity state
export const monitorSelectors = monitorsAdapter.getSelectors<RootState>((state) => state.monitors);

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.monitor.value)`
export const getAllMonitors = (state: RootState): Monitor[] => monitorSelectors.selectAll(state);

export const getMonitorListLoadingStatus = (state: RootState) => state.monitors.monitorListLoadingStatus;

export const getMutatingMonitorStatus = (state: RootState) => state.monitors.mutatingMonitorStatus;

export const monitorsReducer = monitorsSlice.reducer;
