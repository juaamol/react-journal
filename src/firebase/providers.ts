import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { User } from '../auth/types/user';
import { firebaseAuth } from './firebase-config';

const googleAuthProvider = new GoogleAuthProvider();

type GoogleSignInSuccess = {
  ok: true;
  user: User;
};

type GoogleSignInFail = {
  ok: false;
  errorCode: number;
  errorMessage: string;
};

export const signInWithGoogle = async (): Promise<
  GoogleSignInSuccess | GoogleSignInFail
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
