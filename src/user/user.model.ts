export interface GoogleCredential {
  accessToken: string;
}

export interface UserCredential {
  username: string;
  password: string;
}

export interface User {
  id: string;
  idNumber: string;
  password?: string;
}
