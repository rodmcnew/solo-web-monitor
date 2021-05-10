import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import monitorEventsReducer from '../features/monitor-events/monitorEventsSlice';
import monitorsReducer from '../features/monitor/monitorsSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

export const store = configureStore({
  reducer: {
    monitors: monitorsReducer,
    monitorEvents: monitorEventsReducer,
    dashboard: dashboardReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
