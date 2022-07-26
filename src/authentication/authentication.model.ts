import { Nullable } from 'src/shared/utils/type';

export interface AuthenticationResponse {
  token: string;
  user: {
    idNumber: Nullable<string>;
    email: Nullable<string>;
  };
}
