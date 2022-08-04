import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AedEntity } from "./aed.entity";
import { AedMapper } from "./aed.mapper";
import { Aed } from "./aed.model";

@Injectable()
export class AedRepository {
    constructor(
        @InjectRepository(AedEntity)
        private readonly aedRepository: Repository<AedEntity>
    ) { }

    async save(aed: Aed): Promise<Aed> {
        try {
            const aedEntity = AedMapper.toEntity(aed);
            const savedAedEntity = await this.aedRepository.save(aedEntity);
            return AedMapper.fromEntity(savedAedEntity);
        } catch (e) {
            console.log(e);
        }
    }

    async delete(id: string) {
        try {
            this.aedRepository.delete({ id });
        } catch (e) {
            console.log(e);
            throw new Error('Cannot delete aed');
        }
    }

    async findAll() {
        try {
            return await this.aedRepository.find({});
        } catch (e) {
            console.log(e);
        }
    }

    async getAedByIdNumber(idNumber: string) {
        try {
            return await this.aedRepository.find({
                where: { idNumber: idNumber }
            })
        } catch (e) {
            console.log(e);
        }
    }

    async findBy(id: string): Promise<Aed | undefined> {
        try {
            const aed = await this.aedRepository.findOne(id);
            if (!aed) {
                return undefined;
            }
            const map = AedMapper.fromEntity(aed);
            return map;
        } catch (e) {
            throw new Error('Cannot find aed');
        }
    }
}