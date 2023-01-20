import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { journalSlice } from './journal';
import { asyncFunctionMiddleware } from './middleware';
import { AuthState } from './auth/auth-slice';
import { JournalState } from './journal/journal-slice';

export type RootState = {
  auth: AuthState;
  journal: JournalState;
};

const combinedReducer = combineReducers({
  auth: authSlice.reducer,
  journal: journalSlice.reducer,
});

const rootReducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncFunctionMiddleware),
});

export type AppDispatch = typeof store.dispatch;
