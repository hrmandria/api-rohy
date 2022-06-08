import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParentEntity } from './parent.entity';
import { ParentMapper } from './parent.mapper';
import { Parent } from './parent.model';

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
            throw new Error('Cannot save parent');
        }
    }

    async delete(id: string) {
        try {
            await this.parentRepository.delete({ id });
        } catch (e) {
            throw new Error('Cannot delete parent');
        }
    }
}
