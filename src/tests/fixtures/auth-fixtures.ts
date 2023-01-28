import { AuthState } from '../../store/auth/auth-slice';

export const initialState: AuthState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState: AuthState = {
  status: 'authenticated',
  uid: '1234',
  email: 'user@test.com',
  displayName: 'User',
  photoURL: 'https://user.jpg',
  errorMessage: null,
};

export const notAuthenticatesState: AuthState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const errorState: AuthState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: 'error',
};

export const testUser = {
  uid: '1234',
  email: 'user@test.com',
  displayName: 'User',
  photoURL: 'https://user.jpg',
};
