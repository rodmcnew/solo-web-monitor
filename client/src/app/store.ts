import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import monitorDetailsSlice from '../features/monitor-details/monitorDetailsSlice';
import monitorReducer from '../features/monitor/monitorsSlice';
export const store = configureStore({
  reducer: {
    monitors: monitorReducer,
    monitorDetails: monitorDetailsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
