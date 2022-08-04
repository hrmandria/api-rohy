export interface CreateNoteDto {
  studentId: string;
  subjectId: string;
  value: number;
  coefficient: number;
  semester: Semester;
  teacherId: string;
}
