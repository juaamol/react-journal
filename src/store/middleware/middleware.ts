import { AnyAction, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';

export const asyncFunctionMiddleware =
  (storeAPI: MiddlewareAPI<Dispatch<AnyAction>, any>) =>
  (next: Dispatch<AnyAction>) =>
  (action: any) => {
    if (typeof action === 'function') {
      return action(storeAPI.dispatch, storeAPI.getState);
    }

    return next(action);
  };
