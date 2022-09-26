import { Injectable } from '@nestjs/common';
import { DatabaseFileService } from 'src/files/file.service';
import { PaginationCriteria } from 'src/shared/models/paginated.model';
import { StudentEntity } from 'src/student/student.entity';
import { InvalidPaginationInputException } from 'src/student/student.exception';
import { StudentMapper } from 'src/student/student.mapper';
import { FindOptions, StudentRepository } from 'src/student/student.repository';
import { CreateUserDto } from 'src/user/user.dto';
import { UserMapper } from 'src/user/user.mapper';
import { UserService } from 'src/user/user.service';
import { CreateParentDto } from './parent.dto';
import { Parent, ParentStatus } from './parent.model';
import { ChangeOptions, ParentRepository } from './parent.repository';

const maxPageSize = 250;

@Injectable()
export class ParentService {
  constructor(
    private readonly parentRepository: ParentRepository,
    private readonly studentRepository: StudentRepository,
    private readonly userService: UserService,
    private readonly databaseFileService: DatabaseFileService,
  ) { }

  async toEntities(studentIds: string[], students: StudentEntity[]) {
    studentIds.forEach(async (element) => {
      const options: FindOptions = { id: element };
      try {
        const student = await this.studentRepository.findBy(options);
        const entity = StudentMapper.toEntity(student);
        students.push(entity);
      } catch (e) {
        console.log(e);
      }
    });
  }

  async createParent(dto: CreateParentDto) {
    const parent = new Parent();
    parent.lastname = dto.lastname;
    parent.firstname = dto.firstname;
    parent.status = ParentStatus.ACTIVE;
    parent.gender = dto.gender;
    parent.phone = dto.phone;
    const idNumber = await this.userService.generateIdNumber();
    parent.idNumber = idNumber;
    const createUserDto: CreateUserDto = {
      idNumber: idNumber,
      email: dto.email,
      password: dto.password,
    };
    const user = UserMapper.toEntity(
      await this.userService.createUser(createUserDto),
    );
    parent.userId = user.id;
    const studentIds = dto.studentIds;
    const students: StudentEntity[] = [];
    await this.toEntities(studentIds, students);
    parent.students = students;
    return await this.parentRepository.save(parent);
  }

  async listPaginatedParent(criteria: PaginationCriteria) {
    const { page, pageSize } = criteria;

    if (page <= 0) {
      return new InvalidPaginationInputException('page', page);
    }

    if (pageSize <= 0 || pageSize > maxPageSize) {
      return new InvalidPaginationInputException('pageSize', pageSize);
    }
    return this.parentRepository.listPaginatedParent(criteria);
  }

  async modify(changeOpt: ChangeOptions, id: string): Promise<Parent> {
    const options = {
      firstname: changeOpt.firstname,
      lastname: changeOpt.lastname,
      phone: changeOpt.phone,
    };
    return await this.parentRepository.update(options, id);
  }

  async addAvatar(
    imageBuffer: Buffer,
    filename: string,
    id: string,
  ): Promise<Parent> {
    const avatar = await this.databaseFileService.uploadDatabaseFile(
      imageBuffer,
      filename,
    );
    const options = {
      avatar: avatar,
      avatarId: '',
    };
    await this.parentRepository.updateAvatar(options, id);
    const parent = await this.parentRepository.findBy(id);
    return parent;
  }

  async findParent(id: string) {
    return await this.parentRepository.findBy(id);
  }

  async deleteParent(id: string) {
    this.parentRepository.delete(id);
  }

  async findChildren(id: string) {
    return await this.parentRepository.findChildren(id);
  }

  async getParentByIdNumber(idNumber: string) {
    return await this.parentRepository.getParentByIdNumber(idNumber);
  }

  async addChild(studentId: string, parentId: string) {
    const options = {
      id: studentId,
    };
    const childToAdd = StudentMapper.toEntity(
      await this.studentRepository.findBy(options),
    );
    const childrenArray = await this.parentRepository.findChildren(parentId);
    childrenArray.push(childToAdd);
    return await this.parentRepository.addChild(parentId, childrenArray);
  }

  async findParentsByStudent(studentId: string) {
    const parents = await this.parentRepository.findParents();
    const array = parents;
    let parent: ParentEntity[] = [];
    array[0].forEach(parentEntity => {
      const each = parentEntity.students;
      each.forEach(student => {
        if (student.id == studentId) {
          parent.push(parentEntity)
        }
      })
    })
    return parent;
  }

  async findParentWithPhoneNumber(phone: string) {
    return await this.parentRepository.findParentWithPhone(phone);
  }
}
