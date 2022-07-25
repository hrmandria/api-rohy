import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/student/student.entity';
import { Repository } from 'typeorm';
import { ParentEntity } from './parent.entity';
import { ParentMapper } from './parent.mapper';
import { Parent } from './parent.model';

export interface FindOptions {
    firstname: string;
    lastname: string;
    avatarId: string;
    students: StudentEntity[];
}

@Injectable()
export class ParentRepository {
    constructor(
        @InjectRepository(ParentEntity)
        private readonly parentRepository: Repository<ParentEntity>,
    ) { }

    async save(parent: Parent): Promise<Parent> {
        try {
            const parentEntity = ParentMapper.toEntity(parent);
            const savedParentEntity = await this.parentRepository.save(parentEntity);
            return ParentMapper.fromEntity(savedParentEntity);
        } catch (e) {
            console.log(e);
        }
    }

    async delete(id: string) {
        try {
            await this.parentRepository.delete({ id });
        } catch (e) {
            throw new Error('Cannot delete parent');
        }
    }

    async update(options: FindOptions, id: string) {
        this.parentRepository.update({ id }, { ...options });
    }
}
