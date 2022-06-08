import { StudentEntity } from "src/student/student.entity";

export interface CreateParentDto {
    lastname: string;
    firstname: string;
    userId: string;
    students: StudentEntity[];
} 
