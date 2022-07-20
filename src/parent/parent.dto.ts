import { StudentEntity } from "src/student/student.entity";

export interface CreateParentDto {
    lastname: string;
    firstname: string;
    userId: string;
    studentIds: string[];
} 
