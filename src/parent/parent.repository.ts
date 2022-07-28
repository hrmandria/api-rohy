import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseFile } from 'src/files/file.model';
import { StudentEntity } from 'src/student/student.entity';
import { Repository } from 'typeorm';
import { ParentEntity } from './parent.entity';
import { ParentMapper } from './parent.mapper';
import { Parent } from './parent.model';

export interface ChangeOptions {
    firstname: string,
    lastname: string,
    phone: string,
}

export interface avatar {
    avatar: DatabaseFile,
    avatarId: string
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

    async update(options: ChangeOptions, id: string): Promise<Parent> {
        await this.parentRepository.update({ id }, { ...options });
        const parent = await this.findBy(id)
        return parent;
    }

    async findBy(id: string): Promise<Parent | undefined> {
        try {
            const parent = await this.parentRepository.findOne(id)
            if (!parent) {
                return undefined;
            }
            const map = ParentMapper.fromEntity(parent)
            return map;
        } catch (e) {
            throw new Error('Cannot find parent');
        }
    }

    async findChildren(id: string) {
        const children = await this.parentRepository.findAndCount({
            relations: ["students"], where: { id }
        })
        return children[0][0].students;
    }

    async addChild(parentId: string, studentsArray: StudentEntity[]) {
        const parent = ParentMapper.toEntity(await this.findBy(parentId));
        parent.students = studentsArray;
        return await this.parentRepository.save(parent);
    }

    async updateAvatar(options: avatar, id: string) {
        const avatarId = options.avatar.id;
        options.avatarId = avatarId;
        await this.parentRepository.update({ id }, { ...options })
    }
}