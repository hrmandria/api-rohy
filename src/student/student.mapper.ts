import { StudentEntity } from './student.entity';
import { Student } from './student.model';

export class StudentMapper {
  public static fromEntity(source: StudentEntity): Student {
    const student = new Student(source.id);
    student.lastname = source.lastname;
    student.firstname = source.firstname;
    student.status = source.status;
    student.userId = source.userId;
    return student;
  }

  public static toEntity(source: Student): StudentEntity {
    const studentEntity = new StudentEntity();
    studentEntity.id = source.id;
    studentEntity.firstname = source.firstname;
    studentEntity.lastname = source.lastname;
    studentEntity.status = source.status;
    studentEntity.userId = source.userId;
    return studentEntity;
  }
}
