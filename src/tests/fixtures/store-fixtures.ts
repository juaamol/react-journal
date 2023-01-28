import { RootState } from '../../store';
import { authenticatedState } from './auth-fixtures';
import { noteActiveDifferentListState } from './journal-fixtures';

export const testRootState = {
  auth: authenticatedState,
  journal: noteActiveDifferentListState,
} as unknown as RootState;
