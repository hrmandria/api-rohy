import { TeacherEntity } from './teacher.entity';
import { Teacher } from './teacher.model';

export class TeacherMapper {
  public static fromEntity(source: TeacherEntity): Teacher {
    const teacher = new Teacher(source.id);
    teacher.firstname = source.firstname;
    teacher.lastname = source.lastname;
    teacher.subjects = source.subjects;
    teacher.userId = source.userId;
    teacher.idNumber = source.idNumber;

    return teacher;
  }

  public static toEntity(source: Teacher): TeacherEntity {
    const teacherEntity = new TeacherEntity();
    teacherEntity.id = source.id;
    teacherEntity.firstname = source.firstname;
    teacherEntity.lastname = source.lastname;
    teacherEntity.subjects = source.subjects;
    teacherEntity.userId = source.userId;
    teacherEntity.idNumber = source.idNumber;

    return teacherEntity;
  }
}
