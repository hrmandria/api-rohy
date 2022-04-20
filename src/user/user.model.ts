import { Nullable } from 'src/shared/utils/type';

export interface GoogleCredential {
  accessToken: string;
}

export interface UserCredential {
  username: string;
  password: string;
}

export interface User {
  id: string;
  idNumber: Nullable<string>;
  email: Nullable<string>;
  password?: string;
}
