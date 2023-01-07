import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { User } from '../auth/types/user';
import { firebaseAuth } from './firebase-config';

const googleAuthProvider = new GoogleAuthProvider();

type SignInSuccess<T> = {
  ok: true;
  user: T;
};

type SignInFail = {
  ok: false;
  errorCode: string;
  errorMessage: string;
};

export const signInWithGoogle = async (): Promise<
  SignInSuccess<User> | SignInFail
> => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleAuthProvider);
    const { displayName, email, uid, photoURL } = result.user;
    const user = { displayName, email, uid, photoURL };

    return { ok: true, user };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return { ok: false, errorCode, errorMessage };
  }
};

export const registerUserWithPassword = async (values: {
  email: string;
  password: string;
  displayName: string;
}): Promise<SignInSuccess<User> | SignInFail> => {
  try {
    const { email, password, displayName } = values;
    const createUser = createUserWithEmailAndPassword;
    const result = await createUser(firebaseAuth, email, password);
    const { uid } = result.user;
    await updateProfile(firebaseAuth.currentUser!, { displayName });

    return { ok: true, user: { uid, email, displayName, photoURL: null } };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
      errorCode: error.code,
    };
  }
};
