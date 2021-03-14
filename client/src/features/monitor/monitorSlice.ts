import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '../../app/store';
import {DetailsUiMode, Monitor, MonitorEvent, NewMonitor} from '../../types';
const httpApiBaseUrl = 'http://localhost:3000';
export const monitorsAdapter = createEntityAdapter<Monitor>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

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
    await thunkApi.dispatch(fetchAllMonitors());
    await thunkApi.dispatch(showMonitorDetails(response.data.id));
  }
);

//@TODO error handle?
export const patchMonitor = createAsyncThunk(
  'monitors/createStatus',
  async (monitor: Monitor, thunkApi) => {
    await axios.patch(httpApiBaseUrl + '/monitors/' + monitor.id, monitor);
    await thunkApi.dispatch(fetchAllMonitors());
    await thunkApi.dispatch(showMonitorDetails(monitor.id));
  }
);

export const fetchSelectedMonitorEvents = createAsyncThunk(
  'monitors/fetchSelectedMonitorEventsStatus',
  async (selectedMonitorId: string) => {
    const url = httpApiBaseUrl + '/monitor-events?filter[where][monitorId]=' + selectedMonitorId;
    //@TODO only get the events for the curent monitor
    return (await axios.get<MonitorEvent[]>(url)).data;
  }
);

export const monitorSlice = createSlice({
  name: 'monitors',
  initialState: monitorsAdapter.getInitialState({
    selectedMonitorId: null as string | null, //@TODO type better?
    detailsUiMode: DetailsUiMode.View, //@TODO type better, use enum?
    initialMonitorFetchDone: false,
    selectedMonitorEvents: [] as MonitorEvent[] //@TODO type better?
  }),
  reducers: {
    showMonitorDetails: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null) {
        const firstMonitor = monitorsAdapter.getSelectors()
          .selectAll(state).find(() => true);
        if (firstMonitor !== undefined) {
          state.selectedMonitorId = firstMonitor.id;
        }
      } else {
        state.selectedMonitorId = action.payload;
      }
      state.detailsUiMode = DetailsUiMode.View;
    },
    showMonitorEditForm: (state, action: PayloadAction<string>) => {
      state.selectedMonitorId = action.payload;
      state.detailsUiMode = DetailsUiMode.Edit;
    },
    showCreateMonitorForm: (state) => {
      state.selectedMonitorId = null;
      state.detailsUiMode = DetailsUiMode.Create;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchAllMonitors.fulfilled,
      (state, action: PayloadAction<Monitor[]>) => {
        monitorsAdapter.setAll(state, action);
        if (state.selectedMonitorId === null) {
          state.initialMonitorFetchDone = true;
          const firstMonitor = monitorsAdapter.getSelectors()
            .selectAll(state).find(() => true);
          if (firstMonitor !== undefined) {
            state.selectedMonitorId = firstMonitor.id;
          }
        }
      }
    );
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
