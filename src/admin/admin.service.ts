import { DatabaseFileService } from "src/files/file.service";
import { PaginationCriteria } from "src/shared/models/paginated.model";
import { InvalidPaginationInputException } from "src/student/student.exception";
import { CreateUserDto } from "src/user/user.dto";
import { UserMapper } from "src/user/user.mapper";
import { UserService } from "src/user/user.service";
import { CreateAdminDto } from "./admin.dto";
import { Admin } from "./admin.model";
import { AdminRepository, ChangeOptions } from "./admin.repository";
import { Injectable } from '@nestjs/common';

const maxPageSize = 250;

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly userService: UserService,
    private readonly databaseFileService: DatabaseFileService,
  ) { }

  async createAdmin(dto: CreateAdminDto) {
    const admin = new Admin();
    admin.name = dto.name;
    admin.phone = dto.phone;
    const idNumber = await this.userService.generateIdNumber();
    admin.idNumber = idNumber;
    const createUserDto: CreateUserDto = {
      idNumber: idNumber,
      email: dto.email,
      password: dto.password,
      role: 5
    };
    const user = UserMapper.toEntity(
      await this.userService.createUser(createUserDto),
    );
    admin.userId = user.id;
    return await this.adminRepository.save(admin);
  }

  async listPaginatedAdmin(criteria: PaginationCriteria) {
    const { page, pageSize } = criteria;

    if (page <= 0) {
      return new InvalidPaginationInputException('page', page);
    }

    if (pageSize <= 0 || pageSize > maxPageSize) {
      return new InvalidPaginationInputException('pageSize', pageSize);
    }
    return this.adminRepository.listPaginatedAdmin(criteria);
  }

  async modify(changeOpt: ChangeOptions, id: string): Promise<Admin> {
    const options = {
      name: changeOpt.name,
      email: changeOpt.email,
      phone: changeOpt.phone,
    };
    return await this.adminRepository.update(options, id);
  }

  async addAvatar(
    imageBuffer: Buffer,
    filename: string,
    id: string,
  ): Promise<Admin> {
    const avatar = await this.databaseFileService.uploadDatabaseFile(
      imageBuffer,
      filename,
    );
    const options = {
      avatar: avatar,
      avatarId: '',
    };
    await this.adminRepository.updateAvatar(options, id);
    const parent = await this.adminRepository.findBy(id);
    return parent;
  }

  async findAdmin(id: string) {
    return await this.adminRepository.findBy(id);
  }

  async deleteAdmin(id: string) {
    this.adminRepository.delete(id);
  }

  async getAdminByIdNumber(idNumber: string) {
    return await this.adminRepository.getAdminByIdNumber(idNumber);
  }

  async findAdminWithPhoneNumber(phone: string) {
    return await this.adminRepository.findAdminWithPhone(phone);
  }
}
