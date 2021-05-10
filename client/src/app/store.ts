import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { selectedMonitorEventsSlice } from '../features/monitor-events/selectedMonitorEventsSlice';
import { monitorsSlice } from '../features/monitor/monitorsSlice';
export const store = configureStore({
  reducer: {
    [monitorsSlice.name]: monitorsSlice.reducer,
    [selectedMonitorEventsSlice.name]: selectedMonitorEventsSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
