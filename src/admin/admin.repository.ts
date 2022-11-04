import { DatabaseFile } from "src/files/file.model";
import { Paginated, PaginationCriteria } from "src/shared/models/paginated.model";
import { AdminMapper } from "./admin.mapper";
import { Admin } from './admin.model';
import { AdminEntity } from './admin.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


export interface ChangeOptions {
    name: string;
    email: string;
    phone: string;
}

export interface avatar {
    avatar: DatabaseFile;
    avatarId: string;
}

@Injectable()
export class AdminRepository {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) { }

  async save(admin: Admin): Promise<Admin> {
    try {
      const adminEntity = AdminMapper.toEntity(admin);
      const savedAdminEntity = await this.adminRepository.save(adminEntity);
      return AdminMapper.fromEntity(savedAdminEntity);
    } catch (e) {
      console.log(e);
    }
  }

  async listPaginatedAdmin(
    criteria: PaginationCriteria,
  ): Promise<Paginated<Admin>> {
    try {
      const { page, pageSize } = criteria;
      const [entities, total] = await this.adminRepository.findAndCount({
        order: {
          createdAt: 'DESC',
          id: 'ASC',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      return {
        items: entities.map(AdminMapper.fromEntity),
        total,
      };
    } catch (e) {
      throw new Error('Cannot list paginated admin');
    }
  }

  async delete(id: string) {
    try {
      await this.adminRepository.delete({ id });
    } catch (e) {
      throw new Error('Cannot delete parent');
    }
  }
  async update(options: ChangeOptions, id: string): Promise<Admin> {
    await this.adminRepository.update({ id }, { ...options });
    const admin = await this.findBy(id);
    return admin;
  }

  async findBy(id: string): Promise<Admin | undefined> {
    try {
      const admin = await this.adminRepository.findOne(id);
      if (!admin) {
        return undefined;
      }
      const map = AdminMapper.fromEntity(admin);
      return map;
    } catch (e) {
      throw new Error('Cannot find admin');
    }
  }

  async getAdminByIdNumber(idNumber: string) {
    try {
      return await this.adminRepository.find({
        where: { idNumber: idNumber }
      })
    } catch (e) {
      console.log(e);
    }
  }

  async updateAvatar(options: avatar, id: string) {
    const avatarId = options.avatar.id;
    options.avatarId = avatarId;
    await this.adminRepository.update({ id }, { ...options });
  }

  async findAdminWithPhone(phone: string) {
    try {
      const phoneNumber = `+${phone}`
      const parent = await this.adminRepository.find({
        where: { phone: phoneNumber }
      })
      if (!parent) {
        return undefined
      }
      return parent;
    } catch (e) {
      console.log(e);
    }
  }
}
