import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { asyncFunctionMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncFunctionMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
