import { StudentEntity } from './student.entity';
import { Student } from './student.model';

export class StudentMapper {
  public static fromEntity(source: StudentEntity): Student {
    return {
      id: source.id,
      lastname: source.lastname,
      firstname: source.firstname,
      status: source.status,
    };
  }
}
