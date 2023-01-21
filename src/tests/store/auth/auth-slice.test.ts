import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from '../../../store/auth/auth-slice';
import {
  authenticatedState,
  notAuthenticatesState,
} from '../../fixtures/auth-fixtures';
import {
  initialState,
  testUser,
  errorState,
} from '../../fixtures/auth-fixtures';

describe('Test file upload', () => {
  test('Should return inital state with name "auth"', () => {
    expect(authSlice.name).toBe('auth');
    const state = authSlice.reducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });

  test('Should be logged in', () => {
    const state = authSlice.reducer(initialState, login(testUser));
    expect(state).toEqual(authenticatedState);
  });

  test('Should be logged out', () => {
    const payload = { errorMessage: null };
    const state = authSlice.reducer(initialState, logout(payload));
    expect(state).toEqual(notAuthenticatesState);
  });

  test('Should be logged out with error', () => {
    const payload = { errorMessage: 'error' };
    const state = authSlice.reducer(initialState, logout(payload));
    expect(state).toEqual(errorState);
  });

  test('Should check credentials', () => {
    const state = authSlice.reducer(initialState, checkingCredentials());
    expect(state).toEqual(initialState);
  });
});
