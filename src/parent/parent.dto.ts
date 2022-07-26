import { ParentGender } from "./parent.model";

export interface CreateParentDto {
  lastname: string;
  firstname: string;
  email: string;
  studentIds: string[];
  password: string;
}
