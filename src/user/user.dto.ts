export interface CreateUserDto {
  idNumber: string;
  email: string;
  password?: string;
  role: number;
}
