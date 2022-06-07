import { Injectable } from '@nestjs/common';
import { CreateParentDto } from './parent.dto';
import { Parent, ParentStatus } from './parent.model';
import { ParentRepository } from './parent.repository';

@Injectable()
export class ParentService {
    constructor(private readonly parentRepository: ParentRepository) { }

    async createParent(dto: CreateParentDto) {
        const parent = new Parent();
        parent.lastname = dto.lastname;
        parent.firstname = dto.firstname;
        parent.status = ParentStatus.ACTIVE;
        parent.userId = dto.userId;
        parent.students = dto.studentIds;
        return this.parentRepository.save(parent);
    }
}
