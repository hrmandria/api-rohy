import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { result } from "lodash";
import { Paginated, PaginationCriteria } from "src/shared/models/paginated.model";
import { StudentMapper } from "src/student/student.mapper";
import { Repository } from "typeorm";
import { SubjectEntity } from "./subject.entity";
import { SubjectMapper } from "./subject.mapper";
import { Subject } from "./subject.model";

export interface FindOptions {
    id?: string;
}

@Injectable()
export class SubjectRepository {
    constructor(
        @InjectRepository(SubjectEntity)
        private readonly subjectRepository: Repository<SubjectEntity>
    ){}

    findBy(options: FindOptions): Subject | undefined {
        try {
            const subjectEntity = this.subjectRepository.findOne({ ...options }).then(result => {
              return SubjectMapper.fromEntity(result);
            });

            if (!subjectEntity) {
                return undefined
            }

        } catch(e) {
            throw new Error('Cannot find subject');
        }
    }

    async listPaginatedGrade(criteria: PaginationCriteria): Promise<Paginated<Subject>> {
        try {
          const { page, pageSize } = criteria;
          const [entities, total] = await this.subjectRepository.findAndCount({
            order: {
              createdAt: 'DESC',
              id: 'ASC',
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
          });
    
          return {
            items: entities.map(SubjectMapper.fromEntity),
            total,
          };
        } catch (e) {
          throw new Error('Cannot list paginated subject');
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