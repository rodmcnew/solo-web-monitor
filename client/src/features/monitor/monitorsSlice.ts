import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { Monitor, NewMonitor } from '../../types';
import { showMonitorDetails } from '../monitor-details/monitorDetailsSlice';
import { fetchSelectedMonitorEvents } from '../monitor-events/selectedMonitorEventsSlice';
// const httpApiBaseUrl = 'http://localhost:3000/api';
// const httpApiBaseUrl = '/api';//@TODO
const httpApiBaseUrl = 'https://solo-web-monitor.herokuapp.com/api'; //@TODO
export const monitorsAdapter = createEntityAdapter<Monitor>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const fetchAllDisplayedMonitorData = createAsyncThunk(
  'monitors/fetchAllDisplayedMonitorDataStatus',
  async (config: undefined, thunkApi) => {//@TODO config: undefined?
    await thunkApi.dispatch(fetchAllMonitors());
    await thunkApi.dispatch(fetchSelectedMonitorEvents())
  }
);

//@TODO error handle?
export const fetchAllMonitors = createAsyncThunk(
  'monitors/fetchAllStatus',
  async () => {
    return (await axios.get<Monitor[]>(httpApiBaseUrl + '/monitors')).data;
  }
);

//@TODO error handle?
export const deleteMonitor = createAsyncThunk(
  'monitors/deleteStatus',
  async (id: string, thunkApi) => {
    await axios.delete(httpApiBaseUrl + '/monitors/' + id);
    await thunkApi.dispatch(fetchAllMonitors());
    await thunkApi.dispatch(showMonitorDetails(null));
  }
);

//@TODO error handle?
export const createMonitor = createAsyncThunk(
  'monitors/createStatus',
  async (monitor: NewMonitor, thunkApi) => {
    const response = await axios.post<Monitor>(httpApiBaseUrl + '/monitors/', monitor);
    await thunkApi.dispatch(showMonitorDetails(response.data.id));
    await thunkApi.dispatch(fetchAllDisplayedMonitorData());
  }
);

//@TODO error handle?
export const patchMonitor = createAsyncThunk(
  'monitors/createStatus',
  async (monitor: Monitor, thunkApi) => {
    await axios.patch(httpApiBaseUrl + '/monitors/' + monitor.id, monitor);
    await thunkApi.dispatch(showMonitorDetails(monitor.id));
    await thunkApi.dispatch(fetchAllDisplayedMonitorData());
  }
);

//@TODO should this be here and like this? it stratles slices
export const showMonitorDetailsWithRefreshedData = createAsyncThunk(
  'monitors/showMonitorDetailsWithRefreshedDataStatus',
  async (selectedMonitorId: string, thunkApi) => {
    await thunkApi.dispatch(showMonitorDetails(selectedMonitorId));
    await thunkApi.dispatch(fetchSelectedMonitorEvents())
  }
)

export const monitorsSlice = createSlice({
  name: 'monitors',
  initialState: monitorsAdapter.getInitialState({
    initialMonitorsFetchDone: false,
  }),
  reducers: {},
  extraReducers: builder => builder
    .addCase(
      fetchAllMonitors.fulfilled,
      (state, action: PayloadAction<Monitor[]>) => {
        monitorsAdapter.setAll(state, action);
        state.initialMonitorsFetchDone = true;
      })
});

// export const { } = monitorsSlice.actions;

// Can create a set of memoized selectors based on the location of this entity state
const monitorSelectors = monitorsAdapter.getSelectors<RootState>((state) => state.monitor);

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.monitor.value)`
export const getAllMonitors = (state: RootState) => monitorSelectors.selectAll(state);

export const getinitialMonitorsFetchDone = (state: RootState) => state.monitor.initialMonitorsFetchDone;

export default monitorsSlice.reducer;
