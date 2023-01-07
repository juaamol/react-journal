import { checkingCredentials, login, logout } from './auth-slice';
import { signInWithGoogle } from '../../firebase/providers';

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
