export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface Student {
  id: string;
  lastname: string;
  firstname: string;
  status: StudentStatus;
}
