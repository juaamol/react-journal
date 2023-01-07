import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../auth/types/user';

interface AuthState extends User {
  status: 'authenticated' | 'not-authenticated' | 'checking';
  errorMessage: string | null;
}

const initialState: AuthState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.status = 'authenticated';
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, action: PayloadAction<{ errorMessage: string }>) => {
      state.status = 'not-authenticated';
      state.uid = initialState.uid;
      state.email = initialState.email;
      state.displayName = initialState.displayName;
      state.photoURL = initialState.photoURL;
      state.errorMessage = action.payload.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
