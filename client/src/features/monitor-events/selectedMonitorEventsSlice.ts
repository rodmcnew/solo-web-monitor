import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { MonitorEvent } from '../../types';
import { showMonitorDeleteForm, showMonitorDetails, showMonitorEditForm } from '../monitor-details/monitorDetailsSlice';
// const httpApiBaseUrl = 'http://localhost:3000/api';
// const httpApiBaseUrl = '/api';//@TODO
const httpApiBaseUrl = 'https://solo-web-monitor.herokuapp.com/api'; //@TODO
export const monitorEventsAdapter = createEntityAdapter<MonitorEvent>({
  sortComparer: (a, b) => +new Date(b.date) - +new Date(a.date),
})

export const fetchSelectedMonitorEvents = createAsyncThunk(
  'monitors/fetchSelectedMonitorEventsStatus',
  async (config: undefined, thunkApi) => {//@TODO config: undefined?
    //@ts-ignore //@TODO types
    const selectedMonitorId = thunkApi.getState().monitor.selectedMonitorId
    const url = httpApiBaseUrl + '/monitor-events?filter[where][monitorId]=' + selectedMonitorId;
    //@TODO only get the events for the curent monitor
    return (await axios.get<MonitorEvent[]>(url)).data;
  }
);

export const monitorsSlice = createSlice({
  name: 'selectedMonitorEvents',
  initialState: monitorEventsAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => builder
    .addCase(
      fetchSelectedMonitorEvents.fulfilled,
      (state, action: PayloadAction<MonitorEvent[]>) => {
        monitorEventsAdapter.setAll(state, action);
      }
    ).addCase(
      showMonitorDetails.type,
      (state) => {
        monitorEventsAdapter.removeAll(state);
      }
    ).addCase(
      showMonitorEditForm.type,
      (state) => {
        monitorEventsAdapter.removeAll(state);
      }
    ).addCase(
      showMonitorDeleteForm.type,
      (state) => {
        monitorEventsAdapter.removeAll(state);
      }
    )
});

export const { } = monitorsSlice.actions;

// Can create a set of memoized selectors based on the location of this entity state
const monitorEventSelectors = monitorEventsAdapter.getSelectors<RootState>((state) => state.selectedMonitorEvents);

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.monitor.value)`
export const getAllMonitorEvents = (state: RootState) => monitorEventSelectors.selectAll(state);


export default monitorsSlice.reducer;
