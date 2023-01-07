import { checkingCredentials, login, logout } from './auth-slice';
import {
  registerUserWithPassword,
  signInWithGoogle,
} from '../../firebase/providers';
import { Dispatch } from '@reduxjs/toolkit';

export const checkingAuthentication = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();

    if (result.ok) {
      const user = result.user;
      dispatch(login({ ...user }));
    } else {
      dispatch(logout({ errorMessage: result.errorMessage }));
    }
  };
};

export const startCreatingUserWithPassword = (values: {
  email: string;
  password: string;
  displayName: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());
    const result = await registerUserWithPassword(values);

    if (result.ok) {
      const user = result.user;
      dispatch(login({ ...user }));
    } else {
      dispatch(logout({ errorMessage: result.errorMessage }));
    }
  };
};
