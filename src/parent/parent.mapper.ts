import { ParentEntity } from './parent.entity';
import { Parent } from './parent.model';

export class ParentMapper {
  public static fromEntity(source: ParentEntity): Parent {
    const parent = new Parent(source.id);
    parent.lastname = source.lastname;
    parent.firstname = source.firstname;
    parent.status = source.status;
    parent.students = source.students;
    parent.idNumber = source.idNumber;
    parent.gender = source.gender;
    parent.avatar = source.avatar;
    parent.phone = source.phone;
    parent.isPhoneNumberConfirmed = source.isPhoneNumberConfirmed;
    return parent;
  }

  public static toEntity(source: Parent): ParentEntity {
    const parentEntity = new ParentEntity();
    parentEntity.id = source.id;
    parentEntity.lastname = source.lastname;
    parentEntity.firstname = source.firstname;
    parentEntity.status = source.status;
    parentEntity.userId = source.userId;
    parentEntity.students = source.students;
    parentEntity.idNumber = source.idNumber;
    parentEntity.gender = source.gender;
    parentEntity.phone = source.phone;
    parentEntity.avatar = source.avatar;
    parentEntity.isPhoneNumberConfirmed = source.isPhoneNumberConfirmed;
    return parentEntity;
  }
}
