import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { monitorDetailsReducer } from '../features/monitor-details/monitorDetailsSlice';
import { monitorsReducer } from '../features/monitor/monitorsSlice';
export const store = configureStore({
  reducer: {
    monitors: monitorsReducer,
    monitorDetails: monitorDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
