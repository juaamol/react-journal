import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  status: 'authenticated' | 'not-authenticated' | 'checking';
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
}

const initialState: AuthState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {},
    logout: (state, action: PayloadAction<any>) => {},
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
