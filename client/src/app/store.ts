import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { api } from '../api';
import monitorsSlice from '../features/monitors/monitorsSlice';

export const store = configureStore({
  reducer: {
    monitors: monitorsSlice,
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
