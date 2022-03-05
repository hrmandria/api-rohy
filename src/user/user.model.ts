export interface UserCredential {
  username: string;
  password: string;
}

export interface User {
  id: string;
  lastname: string;
  firstname: string;
  idNumber: string;
  password?: string;
}
