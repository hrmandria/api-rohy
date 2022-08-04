import { SubjectEntity } from 'src/subject/subject.entity';
import { GradeEntity } from './grade.entity';
import { Grade } from './grade.model';

export class GradeMapper {
  public static toEntity(source: Grade): GradeEntity {
    const gradeEntity = new GradeEntity();
    gradeEntity.id = source.id;
    gradeEntity.name = source.name;
    gradeEntity.students = source.students;
    gradeEntity.subjects = source.subjects;
    gradeEntity.section = source.section;
    return gradeEntity;
  }

  public static fromEntity(source: GradeEntity): Grade {
    const grade = new Grade(source.id);
    grade.name = source.name;
    grade.students = source.students;
    grade.subjects = source.subjects;
    grade.section = source.section;
    return grade;
  }
}
