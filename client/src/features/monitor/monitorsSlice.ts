import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DetailsUiMode, Monitor, NewMonitor } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
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

export const deleteMonitor = createAsyncThunk(
  'monitors/deleteMonitorStatus',
  async (id: string) => {
    await monitorApi.delete(id);
    return id;
  }
);

export const createMonitor = createAsyncThunk(
  'monitors/createMonitorStatus',
  async (monitor: NewMonitor) => {
    const newMonitor = await monitorApi.create(monitor);
    return newMonitor;
  }
);

export const patchMonitor = createAsyncThunk(
  'monitors/patchMonitorStatus',
  async (monitor: Monitor, thunkApi) => {
    const patchedMonitor = await monitorApi.updateById(monitor.id, monitor);
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
    detailsUiMode: DetailsUiMode.View,
    detailsLoadStatus: OperationStatus.Loading,
  },
  reducers: {},
  extraReducers: builder => builder
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
      createMonitor.fulfilled,
      (state, action: PayloadAction<Monitor>) => {
        monitorsAdapter.addOne(state.monitors, action.payload);
      })
    .addCase(
      patchMonitor.fulfilled,
      (state, action: PayloadAction<Monitor>) => {
        monitorsAdapter.updateOne(state.monitors, { id: action.payload.id, changes: action.payload });
      })
    .addCase(
      deleteMonitor.fulfilled,
      (state, action: PayloadAction<string>) => {
        monitorsAdapter.removeOne(state.monitors, action.payload);
      })
});

export const monitorSelectors = monitorsAdapter.getSelectors<RootState>((state) => state.monitors.monitors);

export const getAllMonitors = (state: RootState): Monitor[] => monitorSelectors.selectAll(state);

export const getMonitorListLoadingStatus = (state: RootState) => state.monitors.monitorListLoadingStatus;

export const monitorsReducer = monitorsSlice.reducer;