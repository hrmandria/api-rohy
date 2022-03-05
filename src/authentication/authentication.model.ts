import { User } from 'src/user/user.model';

export interface AuthenticationResponse {
  token: string;
  user: User;
}
