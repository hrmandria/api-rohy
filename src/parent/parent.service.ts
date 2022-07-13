import { Injectable } from '@nestjs/common';
import { StudentEntity } from 'src/student/student.entity';
import { StudentMapper } from 'src/student/student.mapper';
import { FindOptions, StudentRepository } from 'src/student/student.repository';
import { CreateParentDto } from './parent.dto';
import { Parent, ParentStatus } from './parent.model';
import { ParentRepository } from './parent.repository';

@Injectable()
export class ParentService {
    constructor(
        private readonly parentRepository: ParentRepository,
        private readonly studentRepository: StudentRepository
    ) { }

    async createParent(dto: CreateParentDto) {
        const parent = new Parent();
        parent.lastname = dto.lastname;
        parent.firstname = dto.firstname;
        parent.status = ParentStatus.ACTIVE;
        parent.userId = dto.userId;
        const students : StudentEntity[] = [];
        const studentIds = dto.studentIds;
        studentIds.forEach(element => {
            const options : FindOptions = { id: element }
            try {
                const student = this.studentRepository.findBy(options);
                const entity = StudentMapper.toEntity(student);
                students.push(entity);
            } catch (e) {
                console.log(e);
                throw new Error('Cannot find student with '+ element +' id.')
            }
        });
        parent.students = students;
        return this.parentRepository.save(parent);
    }

    async deleteParent(id: string) {
        this.parentRepository.delete(id);
    }
}
