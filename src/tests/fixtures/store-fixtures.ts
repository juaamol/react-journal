import { RootState } from '../../store';
import { authenticatedState } from './auth-fixtures';

export const rootAuthenticatedState = {
  auth: authenticatedState,
} as unknown as RootState;
