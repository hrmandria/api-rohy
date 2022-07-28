import { ParentGender } from "./parent.model";

export interface CreateParentDto {
  lastname: string;
  firstname: string;
  email: string;
  gender: ParentGender;
  studentIds: string[];
  password: string;
} 
