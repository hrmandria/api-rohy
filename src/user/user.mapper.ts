import { UserEntity } from './user.entity';
import { User } from './user.model';

export class UserMapper {
  public static toEntity(source: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = source.id;
    userEntity.idNumber = source.idNumber;
    userEntity.email = source.email;
    userEntity.password = source.password;
    return;
  }

  public static fromEntity(source: UserEntity): User {
    const user = new User(source.id);
    user.idNumber = source.idNumber;
    user.email = source.email;
    user.password = source.password;
    return user;
  }
}
