import { ParentEntity } from "src/parent/parent.entity";

export interface CreateStudentDto {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  parents: string[];
}