import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '../../app/store';
import {Monitor} from './MonitorType';
import {NewMonitor} from './NewMonitorType';

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
    return (await axios.get<Monitor[]>('http://localhost/monitors')).data;
  }
);

//@TODO base api path?
//@TODO error handle?
export const deleteMonitor = createAsyncThunk(
  'monitors/deleteStatus',
  async (id: string, thunkApi) => {
    await axios.delete('http://localhost/monitors/' + id);
    await thunkApi.dispatch(fetchAllMonitors());
    await thunkApi.dispatch(showMonitorDetails(null));
  }
);

//@TODO base api path?
//@TODO error handle?
export const createMonitor = createAsyncThunk(
  'monitors/createStatus',
  async (monitor: NewMonitor, thunkApi) => {
    const response = await axios.post<Monitor>('http://localhost/monitors/', monitor);
    await thunkApi.dispatch(fetchAllMonitors());
    await thunkApi.dispatch(showMonitorDetails(response.data.id));
  }
);

//@TODO base api path?
//@TODO error handle?
export const patchMonitor = createAsyncThunk(
  'monitors/createStatus',
  async (monitor: Monitor, thunkApi) => {
    await axios.patch('http://localhost/monitors/' + monitor.id, monitor);
    await thunkApi.dispatch(fetchAllMonitors());
    await thunkApi.dispatch(showMonitorDetails(monitor.id));
  }
);

export const monitorSlice = createSlice({
  name: 'monitors',
  initialState: monitorsAdapter.getInitialState({
    selectedMonitorId: null as string | null, //@TODO type better?
    detailsUiMode: 'view', //@TODO type better, use enum?
    initialMonitorFetchDone: false
  }),
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
      fetchAllMonitors.fulfilled,
      (state, action: PayloadAction<Monitor[]>) => {
        monitorsAdapter.setAll(state, action);
        state.initialMonitorFetchDone = true;
      })
  },
});

export const {showMonitorDetails, showMonitorEditForm, showCreateMonitorForm} = monitorSlice.actions;


// Can create a set of memoized selectors based on the location of this entity state
const monitorSelectors = monitorsAdapter.getSelectors<RootState>((state) => state.monitor);

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.monitor.value)`
export const getAllMonitors = (state: RootState) => monitorSelectors.selectAll(state);

export const getGelectedMonitorId = (state: RootState) => state.monitor.selectedMonitorId;

export const getDetailsUiMode = (state: RootState) => state.monitor.detailsUiMode;

export const getInitialMonitorFetchDone = (state: RootState) => state.monitor.initialMonitorFetchDone;

export default monitorSlice.reducer;
