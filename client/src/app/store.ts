import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { api } from '../api';
import dashboardReducer from '../features/dashboard/dashboardSlice';

export const store = configureStore({
  reducer: {
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
