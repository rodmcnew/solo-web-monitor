import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { MonitorEvent, MonitorEventsData } from '../../types';
import { OperationStatus } from '../../types/OperationStatus';
import { monitorEventsApi } from '../monitor-events/monitorEventsApi';

const monitorEventsSortComparer = (a: MonitorEvent, b: MonitorEvent) => +new Date(b.date) - +new Date(a.date);

/**
 * This is currently set to ten seconds for cache feature demonstration purposes.
 * Something like one minute might make more sense.
 */
const MONITOR_EVENTS_CACHE_TIME = 10 * 1000;

export const fetchMonitorEventsIfNeeded = createAsyncThunk(
  'monitors/fetchMonitorEventsIfNeededStatus',
  async (monitorId: string, thunkApi) => {
    const selectedMonitorEventsData = getMonitorEventsByMonitorId(thunkApi.getState() as RootState, monitorId);
    if (
      selectedMonitorEventsData.loadingStatus === OperationStatus.NotStarted
      || (
        selectedMonitorEventsData.lastFetchedTimestamp !== null
        && +new Date - +selectedMonitorEventsData.lastFetchedTimestamp > MONITOR_EVENTS_CACHE_TIME
      )
    ) {
      await thunkApi.dispatch(fetchMonitorEvents(monitorId));
    }
  }
);

export const fetchMonitorEvents = createAsyncThunk(
  'monitors/fetchMonitorEventsStatus',
  async (monitorId: string, thunkApi) => {
    const monitorEvents = await monitorEventsApi.findByMonitorId(monitorId);
    return {
      monitorId,
      monitorEvents: monitorEvents,
      fetchedTimestamp: (new Date).getTime()
    }
  }
);

export const monitorEventsSlice = createSlice({
  name: 'monitorEventsSlice',
  initialState: {} as Record<string, MonitorEventsData>,
  reducers: {},
  extraReducers: builder => builder
    .addCase(
      fetchMonitorEvents.pending,
      (state, action) => {
        const monitorId = action.meta.arg;
        state[monitorId] = {
          events: [],
          lastFetchedTimestamp: null,
          loadingStatus: OperationStatus.Loading
        };
      })
    .addCase(
      fetchMonitorEvents.fulfilled,
      (state, action: PayloadAction<{ monitorId: string, monitorEvents: MonitorEvent[], fetchedTimestamp: number }>) => {
        state[action.payload.monitorId] = {
          events: action.payload.monitorEvents.sort(monitorEventsSortComparer),
          lastFetchedTimestamp: action.payload.fetchedTimestamp,
          loadingStatus: OperationStatus.Done
        };
      })
    .addCase(
      fetchMonitorEvents.rejected,
      (state, action) => {
        const monitorId = action.meta.arg;
        state[monitorId] = {
          events: [],
          lastFetchedTimestamp: null,
          loadingStatus: OperationStatus.Error
        };
      }
    )
});

export const getMonitorEventsByMonitorId = (state: RootState, monitorId: string | null): MonitorEventsData => {
  const defaultReturnData = {
    events: [],
    lastFetchedTimestamp: null,
    loadingStatus: OperationStatus.NotStarted
  };
  if (monitorId === null) {
    return defaultReturnData;
  }
  const selectedMonitorEventsData = state[monitorEventsSlice.name][monitorId];
  if (selectedMonitorEventsData === undefined) {
    return defaultReturnData;
  }
  return selectedMonitorEventsData;
}