import { StudentEntity } from './student.entity';
import { Student } from './student.model';

export class StudentMapper {
  public static fromEntity(source: StudentEntity): Student {
    const student = new Student(source.id);
    student.lastname = source.lastname;
    student.firstname = source.firstname;
    student.status = source.status;
    student.userId = source.userId;
    student.idNumber = source.idNumber;
    student.parents = source.parents;
    return student;
  }

  public static toEntity(source: Student): StudentEntity {
    const studentEntity = new StudentEntity();
    studentEntity.id = source.id;
    studentEntity.firstname = source.firstname;
    studentEntity.lastname = source.lastname;
    studentEntity.status = source.status;
    studentEntity.userId = source.userId;
    studentEntity.idNumber = source.idNumber;
    studentEntity.parents = source.parents;
    return studentEntity;
  }
}
