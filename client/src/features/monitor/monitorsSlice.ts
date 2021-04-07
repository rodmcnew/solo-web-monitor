import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Monitor, NewMonitor } from '../../types';
import { showMonitorDetails, showMonitorDetailsForAnyMonitor } from '../monitor-details/monitorDetailsSlice';
import { monitorApi } from './monitorApi';

export const monitorsAdapter = createEntityAdapter<Monitor>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

//@TODO error handle?
export const fetchAllMonitors = createAsyncThunk(
  'monitors/fetchAllStatus',
  async () => {
    return await monitorApi.findAll();
  }
);

export const deleteMonitorThenShowDetailsForAnyMonitor = createAsyncThunk(
  'monitors/deleteMonitorThenShowDetailsForAnyMonitorStatus',
  async (id: string, thunkApi) => {
    await thunkApi.dispatch(deleteMonitor(id));
    //@ts-ignore
    await thunkApi.dispatch(showMonitorDetailsForAnyMonitor());
  }
);

//@TODO error handle?
export const deleteMonitor = createAsyncThunk(
  'monitors/deleteStatus',
  async (id: string) => {
    await monitorApi.delete(id);
    return id;
  }
);

export const createMonitorThenShowItsDetails = createAsyncThunk(
  'monitors/createMonitorThenShowItsDetailsStatus',
  async (monitor: NewMonitor, thunkApi) => {
    const newMonitor = await monitorApi.create(monitor);
    thunkApi.dispatch(createMonitorFulfilled(newMonitor));
    await thunkApi.dispatch(showMonitorDetails(newMonitor.id));
  }
);

//@TODO error handle?
export const patchMonitor = createAsyncThunk(
  'monitors/createStatus',
  async (monitor: Monitor, thunkApi) => {
    //@TODO stop fetching all, just do the patch? or maybe use patched result from server?
    await monitorApi.updateById(monitor.id, monitor);
    await thunkApi.dispatch(fetchAllMonitors());
    await thunkApi.dispatch(showMonitorDetails(monitor.id));
  }
);

export const monitorsSlice = createSlice({
  name: 'monitors',
  initialState: monitorsAdapter.getInitialState({
    initialMonitorsFetchDone: false,
  }),
  reducers: {
    createMonitorFulfilled: (state, action: PayloadAction<Monitor>) => {
      monitorsAdapter.addOne(state, action.payload);
    }
  },
  extraReducers: builder => builder
    .addCase(
      fetchAllMonitors.fulfilled,
      (state, action: PayloadAction<Monitor[]>) => {
        monitorsAdapter.setAll(state, action);
        state.initialMonitorsFetchDone = true;
      })
    .addCase(
      deleteMonitor.fulfilled,
      (state, action: PayloadAction<string>) => {
        monitorsAdapter.removeOne(state, action);
      })
});

export const { createMonitorFulfilled } = monitorsSlice.actions;

// Can create a set of memoized selectors based on the location of this entity state
const monitorSelectors = monitorsAdapter.getSelectors<RootState>((state) => state.monitors);

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.monitor.value)`
export const getAllMonitors = (state: RootState) => monitorSelectors.selectAll(state);

export const getinitialMonitorsFetchDone = (state: RootState) => state.monitors.initialMonitorsFetchDone;

export const monitorsReducer = monitorsSlice.reducer;
