import { Dispatch } from '@reduxjs/toolkit';

export const startPasswordSignIn = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    console.log('new thunk');
  };
};
