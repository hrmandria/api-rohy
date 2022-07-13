import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoteMapper } from "src/note/note.mapper";
import { Note } from "src/note/note.model";
import { Paginated, PaginationCriteria } from "src/shared/models/paginated.model";
import { Repository } from "typeorm";
import { GradeEntity } from "./grade.entity";
import { GradeMapper } from "./grade.mapper";
import { Grade } from "./grade.model";

export interface FindOptions {
    id?: string;
    name?: string;
}

@Injectable()
export class GradeRepository {
    constructor(
        @InjectRepository(GradeEntity)
        private readonly gradeRepository: Repository<GradeEntity>
    ){}

    async listPaginatedGrade(criteria: PaginationCriteria): Promise<Paginated<Grade>> {
        try {
          const { page, pageSize } = criteria;
          const [entities, total] = await this.gradeRepository.findAndCount({
            order: {
              createdAt: 'DESC',
              id: 'ASC',
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
          });
    
          return {
            items: entities.map(GradeMapper.fromEntity),
            total,
          };
        } catch (e) {
          throw new Error('Cannot list paginated grade');
        }
      }

    async findBy(options: FindOptions): Promise<Grade | undefined> {
        try {
            const gradeEntity = await this.gradeRepository.findOne({ ...options })
            if (!gradeEntity) {
                return undefined
            }
            return GradeMapper.fromEntity(gradeEntity)

        } catch (e) {
            throw new Error('Cannot find grade')
        }
    }

    async save(grade: Grade): Promise<Grade> {
      try {
        const gradeEntity = GradeMapper.toEntity(grade);
        const savedGradeEntity = await this.gradeRepository.save(
          gradeEntity,
        );
        return GradeMapper.fromEntity(savedGradeEntity);
      } catch (e) {
        throw new Error('Cannot save grade');
      }
    }
}