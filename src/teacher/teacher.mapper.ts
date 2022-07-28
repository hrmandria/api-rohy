import { TeacherEntity } from './teacher.entity';
import { Teacher } from './teacher.model';

export class TeacherMapper {
  public static fromEntity(source: TeacherEntity): Teacher {
    const teacher = new Teacher(source.id);
    teacher.firstname = source.firstname;
    teacher.lastname = source.lastname;
    teacher.subjects = source.subjects;
    return teacher;
  }

  public static toEntity(source: Teacher): TeacherEntity {
    const teacherEntity = new TeacherEntity();
    teacherEntity.firstname = source.firstname;
    teacherEntity.lastname = source.lastname;
    teacherEntity.subjects = source.subjects;
    return teacherEntity;
  }
}
