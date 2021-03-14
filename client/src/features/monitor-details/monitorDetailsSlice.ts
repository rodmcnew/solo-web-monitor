import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '../../app/store';
import {Monitor, MonitorEvent} from '../../types';
const httpApiBaseUrl = 'http://localhost:3000';//@TODO put somewhere else?
export const monitorsAdapter = createEntityAdapter<Monitor>({
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

//@TODO naming confusion between "selectors" and things like "selectMonitor", i named them with get?

//@TODO base api path?
//@TODO error handle?
export const fetchAllMonitors = createAsyncThunk(
  'monitors/fetchAllStatus',
  async () => {
    return (await axios.get<Monitor[]>(httpApiBaseUrl + '/monitors')).data;
  }
);

export const fetchSelectedMonitorEvents = createAsyncThunk(
  'monitors/fetchSelectedMonitorEventsStatus',
  async () => {
    //@TODO only get the events for the curent monitor
    return (await axios.get<MonitorEvent[]>(httpApiBaseUrl + '/monitor-events')).data;
  }
);

export const monitorSlice = createSlice({
  name: 'monitors',
  initialState: {
    selectedMonitorId: null as string | null, //@TODO type better?
    detailsUiMode: 'view', //@TODO type better, use enum?
    initialMonitorFetchDone: false,
    selectedMonitorEvents: [] as MonitorEvent[] //@TODO type better?
  },
  reducers: {
    showMonitorDetails: (state, action: PayloadAction<string | null>) => {
      if (action.payload !== null) {
        state.selectedMonitorId = action.payload;
      }
      state.detailsUiMode = 'view';
    },
    showMonitorEditForm: (state, action: PayloadAction<string>) => {
      state.selectedMonitorId = action.payload;
      state.detailsUiMode = 'edit';
    },
    showCreateMonitorForm: (state) => {
      state.selectedMonitorId = null;
      state.detailsUiMode = 'create';
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchSelectedMonitorEvents.fulfilled,
      (state, action: PayloadAction<MonitorEvent[]>) => {
        state.selectedMonitorEvents = action.payload.sort((a, b) =>
          //@ts-ignore //@TODO improve
          new Date(b.date) - new Date(a.date)
        );
      }
    );
  },
});

export const {showMonitorDetails, showMonitorEditForm, showCreateMonitorForm} = monitorSlice.actions;


// Can create a set of memoized selectors based on the location of this entity state
const monitorSelectors = monitorsAdapter.getSelectors<RootState>((state) => state.monitor);

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.monitor.value)`
export const getAllMonitors = (state: RootState) => monitorSelectors.selectAll(state);

export const getSelectedMonitorId = (state: RootState) => state.monitor.selectedMonitorId;

export const getDetailsUiMode = (state: RootState) => state.monitor.detailsUiMode;

export const getInitialMonitorFetchDone = (state: RootState) => state.monitor.initialMonitorFetchDone;

export const getSelectedMonitorEvents = (state: RootState) => state.monitor.selectedMonitorEvents;

export default monitorSlice.reducer;
