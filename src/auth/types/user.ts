import { UserInfo } from 'firebase/auth';

export interface User
  extends Pick<UserInfo, 'email' | 'displayName' | 'photoURL'> {
  uid: string | null;
}
