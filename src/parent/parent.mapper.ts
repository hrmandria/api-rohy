import { ParentEntity } from './parent.entity';
import { Parent } from './parent.model';

export class ParentMapper {
  public static fromEntity(source: ParentEntity): Parent {
    const parent = new Parent();
    parent.lastname = source.lastname;
    parent.firstname = source.firstname;
    parent.status = source.status;
    parent.userId = source.userId;
    parent.students = source.students;
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
    return parentEntity;
  }
}
