export interface UserCredential {
  username: string;
  password: string;
}

export interface User {
  id: string;
  idNumber: string;
  password?: string;
}

export interface UserData {
  id: string;
  firstname: string;
  lastname: string;
  idNumber: string;
  password: string;
}