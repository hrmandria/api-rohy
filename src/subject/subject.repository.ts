import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubjectEntity } from "./subject.entity";
import { SubjectMapper } from "./subject.mapper";
import { Subject } from "./subject.model";

export interface FindOptions {
    id?: string;
    name?: string;
}

@Injectable()
export class SubjectRepository {
    constructor(
        @InjectRepository(SubjectEntity)
        private readonly subjectRepository: Repository<SubjectEntity>
    ){}

    async findBy(options: FindOptions): Promise<Subject | undefined> {
        try {
            const subjectEntity = await this.subjectRepository.findOne({ ...options });

            if (!subjectEntity) {
                return undefined
            }

            return SubjectMapper.fromEntity(subjectEntity);
        } catch(e) {
            throw new Error('Cannot find subject');
        }
    }

    async save(subject: Subject) {
        try {
            const subjectEntity = SubjectMapper.toEntity(subject);
            const savedSubjectEntity = await this.subjectRepository.save(subjectEntity);
            return SubjectMapper.fromEntity(savedSubjectEntity);
        } catch (e) {
            throw new Error('Cannot save subject.')
        }
    }
}