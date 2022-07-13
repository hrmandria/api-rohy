import { Injectable } from "@nestjs/common";
import { StudentMapper } from "src/student/student.mapper";
import { SubjectMapper } from "src/subject/subject.mapper";
import { SubjectRepository } from "src/subject/subject.repository";
import { CreateTeacherDto } from "./teacher.dto";
import { Teacher } from "./teacher.model";
import { TeacherRepository } from "./teacher.repository";

@Injectable()
export class TeacherService {
    constructor(
        private readonly teacherRepository: TeacherRepository,
        private readonly subjectRepository: SubjectRepository) {}

    async createTeacher(dto: CreateTeacherDto): Promise<Teacher> {
        const teacher = new Teacher();
        teacher.firstname = dto.firstname;
        teacher.lastname = dto.lastname;
        teacher.subjects = [];
        const subjectIds = dto.subjectIds;
        subjectIds.forEach(element => {
            try {
                const options = { id: element }
                const temp = SubjectMapper.toEntity(this.subjectRepository.findBy(options));
                teacher.subjects.push(temp);
            } catch (e) {
                console.log(e);
                throw new Error ('Cannot find entity corresponding to'+ element)
            }
        });
        
        return this.teacherRepository.save(teacher);
    }
}