import { AbstractModel } from 'src/shared/models/abstract.model';
import { Nullable } from 'src/shared/utils/type';

export interface GoogleCredential {
  accessToken: string;
}

export interface UserCredential {
  username: string;
  password: string;
}

export interface AuthenticationToken {
  token: string;
}

export class User extends AbstractModel {
  idNumber: Nullable<string>;
  email: Nullable<string>;
  password?: string;
}