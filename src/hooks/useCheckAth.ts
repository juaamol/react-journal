import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { firebaseAuth } from '../firebase/firebase-config';
import { login, logout } from '../store';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useCheckAuth = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const { displayName, uid, photoURL, email } = user;
        dispatch(login({ displayName, uid, photoURL, email }));
      } else {
        dispatch(logout({ errorMessage: null }));
      }
    });

    return () => unsubscribe();
  }, []);

  return status;
};
