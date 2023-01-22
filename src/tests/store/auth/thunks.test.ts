import {
  registerUserWithPassword,
  signInWithGoogle,
  signInWithPassword,
  signOut,
} from '../../../firebase/providers';
import {
  checkingCredentials,
  login,
  logout,
  startCreatingUserWithPassword,
  startGoogleSignIn,
  startLogingOut,
  startPasswordSignIn,
} from '../../../store';
import { testUser } from '../../fixtures/auth-fixtures';

jest.mock('../../../firebase/providers', () => ({
  signInWithPassword: jest.fn(),
  registerUserWithPassword: jest.fn(),
  signInWithGoogle: jest.fn(),
  signOut: jest.fn(),
}));

describe('Test auth thunks', () => {
  test('Should login with password and fail', async () => {
    const error = { ok: false, errorMessage: 'error' };
    (signInWithPassword as jest.Mock).mockReturnValue(error);
    const startSignIn = startPasswordSignIn(testUser.email, 'pass');
    const dispatch = jest.fn();
    await startSignIn(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: 'error' }));
  });

  test('Should login with password', async () => {
    const response = { ok: true, user: testUser };
    (signInWithPassword as jest.Mock).mockReturnValue(response);
    const startSignIn = startPasswordSignIn(testUser.email, 'pass');
    const dispatch = jest.fn();
    await startSignIn(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(testUser));
  });

  test('Should login with Google and fail', async () => {
    const error = { ok: false, errorMessage: 'error' };
    (signInWithGoogle as jest.Mock).mockReturnValue(error);
    const startSignIn = startGoogleSignIn();
    const dispatch = jest.fn();
    await startSignIn(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: 'error' }));
  });

  test('Should login with Google', async () => {
    const response = { ok: true, user: testUser };
    (signInWithGoogle as jest.Mock).mockReturnValue(response);
    const startSignIn = startGoogleSignIn();
    const dispatch = jest.fn();
    await startSignIn(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(testUser));
  });

  test('Should create new user with password and fail', async () => {
    const error = { ok: false, errorMessage: 'error' };
    const newUser = { ...testUser, password: '' };
    (registerUserWithPassword as jest.Mock).mockReturnValue(error);
    const startCreating = startCreatingUserWithPassword(newUser);
    const dispatch = jest.fn();
    await startCreating(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: 'error' }));
  });

  test('Should create new user with password', async () => {
    const response = { ok: true, user: testUser };
    const newUser = { ...testUser, password: '' };
    (registerUserWithPassword as jest.Mock).mockReturnValue(response);
    const startCreating = startCreatingUserWithPassword(newUser);
    const dispatch = jest.fn();
    await startCreating(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(testUser));
  });

  test('Should logout and fail', async () => {
    (signOut as jest.Mock).mockImplementation(() => {
      throw new Error();
    });
    const startSignOut = startLogingOut();
    const dispatch = jest.fn();
    await startSignOut(dispatch);

    expect(dispatch).not.toHaveBeenCalled();
  });

  test('Should logout', async () => {
    const startSignOut = startLogingOut();
    const dispatch = jest.fn();
    await startSignOut(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: null }));
  });
});
