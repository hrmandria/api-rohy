import { SectionType } from "./grade.model";

export interface CreateGradeDto {
  name: string;
  section: SectionType;
  studentIds: string[];
  subjectNames: string[];
}
