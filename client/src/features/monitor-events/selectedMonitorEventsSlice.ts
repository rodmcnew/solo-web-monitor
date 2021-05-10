import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { MonitorEvent, MonitorEventsData } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
import { monitorEventsApi } from '../monitor-events/monitorEventsApi';
import { getSelectedMonitorId } from '../monitor/monitorsSlice';

const monitorEventsSortComparer = (a: MonitorEvent, b: MonitorEvent) => +new Date(b.date) - +new Date(a.date);

/**
 * This is currently set to ten seconds for cache feature demonstration purposes.
 * Something like one minute might make more sense.
 */
const MONITOR_EVENTS_CACHE_TIME = 10 * 1000;

export const fetchSelectedMonitorEventsIfNeeded = createAsyncThunk(
  'monitors/fetchSelectedMonitorEventsIfNeededStatus',
  async (monitorId: string, thunkApi) => {
    const selectedMonitorEventsData = getSelectedMonitorEventsData(thunkApi.getState() as RootState);
    if (
      selectedMonitorEventsData.loadingStatus === OperationStatus.NotStarted
      || (
        selectedMonitorEventsData.lastFetchedDate !== null
        && +new Date - +selectedMonitorEventsData.lastFetchedDate > MONITOR_EVENTS_CACHE_TIME
      )
    ) {
      await thunkApi.dispatch(fetchSelectedMonitorEvents(monitorId));
    }
  }
);

export const fetchSelectedMonitorEvents = createAsyncThunk(
  'monitors/fetchSelectedMonitorEventsStatus',
  async (monitorId: string, thunkApi) => {
    const monitorEvents = await monitorEventsApi.findByMonitorId(monitorId);
    return {
      monitorId,
      monitorEvents: monitorEvents,
      fetchedDate: new Date
    }
  }
);

export const selectedMonitorEventsSlice = createSlice({
  name: 'monitorEvents',
  initialState: {} as Record<string, MonitorEventsData>,
  reducers: {},
  extraReducers: builder => builder
    .addCase(
      fetchSelectedMonitorEvents.pending,
      (state, action) => {
        const monitorId = action.meta.arg;
        state[monitorId] = {
          events: [],
          lastFetchedDate: null,
          loadingStatus: OperationStatus.Loading
        };
      })
    .addCase(
      fetchSelectedMonitorEvents.fulfilled,
      (state, action: PayloadAction<{ monitorId: string, monitorEvents: MonitorEvent[], fetchedDate: Date }>) => {
        state[action.payload.monitorId] = {
          events: action.payload.monitorEvents.sort(monitorEventsSortComparer),
          lastFetchedDate: action.payload.fetchedDate,
          loadingStatus: OperationStatus.Done
        };
      })
    .addCase(
      fetchSelectedMonitorEvents.rejected,
      (state, action) => {
        const monitorId = action.meta.arg;
        state[monitorId] = {
          events: [],
          lastFetchedDate: null,
          loadingStatus: OperationStatus.Error
        };
      }
    )
});

export const getSelectedMonitorEventsData = (state: RootState): MonitorEventsData => {
  const defaultReturnData = {
    events: [],
    lastFetchedDate: null,
    loadingStatus: OperationStatus.NotStarted
  };
  const selectedMonitorId = getSelectedMonitorId(state);
  if (selectedMonitorId === null) {
    return defaultReturnData;
  }
  const selectedMonitorEventsData = state[selectedMonitorEventsSlice.name][selectedMonitorId];
  if (selectedMonitorEventsData === undefined) {
    return defaultReturnData;
  }
  return selectedMonitorEventsData;
};