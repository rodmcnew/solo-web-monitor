import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import monitorEventsReducer from '../features/monitor-events/monitorEventsSlice';
import monitorsReducer from '../features/monitor/monitorsSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import { api } from '../api';

export const store = configureStore({
  reducer: {
    monitors: monitorsReducer,
    monitorEvents: monitorEventsReducer,
    dashboard: dashboardReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
