import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StudentEntity } from 'src/student/student.entity';
import { UserEntity } from 'src/user/user.entity';
import { SubjectEntity } from 'src/subject/subject.entity';
import { GradeEntity } from 'src/grade/grade.entity';
import { NoteEntity } from 'src/note/note.entity';
import { TeacherEntity } from 'src/teacher/teacher.entity';
import { CourseEntity } from 'src/course/course.entity';
import { TimetableEntity } from 'src/timetable/timetable.entity';
import { TicketEntity } from 'src/ticket/ticket.entity';
import { ParentEntity } from 'src/parent/parent.entity';
import { DatabaseFileEntity } from 'src/files/file.entity';
import { TicketEntity } from 'src/ticket/ticket.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) { }

  public getTypeORMConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('TYPEORM_HOST'),
      username: this.getValue('TYPEORM_USERNAME'),
      password: this.getValue('TYPEORM_PASSWORD'),
      database: this.getValue('TYPEORM_DATABASE'),
      port: +this.getValue('TYPEORM_PORT'),
      entities: [
        UserEntity,
        StudentEntity,
        SubjectEntity,
        GradeEntity,
        NoteEntity,
        TeacherEntity,
        CourseEntity,
        TimetableEntity,
        ParentEntity,
        DatabaseFileEntity,
        TicketEntity,
      ],
      synchronize: true,
    };
  }

  public getJwtConfig(): { secret: string } {
    return {
      secret: this.getValue('JWT_SECRET'),
    };
  }

  public getGoogleClientConfig(): { clientID: string; secret: string } {
    return {
      clientID: this.getValue('GOOGLE_CLIENT_ID'),
      secret: this.getValue('GOOGLE_CLIENT_SECRET'),
    };
  }

  private getValue(key: string): string {
    const value = this.env[key];
    if (!value) {
      throw new Error(`Missing env variable ${key}`);
    }

    return value;
  }
}

export const configService = new ConfigService(process.env);
