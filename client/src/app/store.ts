import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { monitorEventsSlice } from '../features/monitor-events/monitorEventsSlice';
import { monitorsSlice } from '../features/monitor/monitorsSlice';
import { dashboardSlice } from '../features/dashboard/dashboardSlice';

export const store = configureStore({
  reducer: {
    [monitorsSlice.name]: monitorsSlice.reducer,
    [monitorEventsSlice.name]: monitorEventsSlice.reducer,
    [dashboardSlice.name]: dashboardSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
