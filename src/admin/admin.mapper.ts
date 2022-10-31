import { AdminEntity } from './admin.entity';
import { Admin } from './admin.model';

export class AdminMapper {
    public static fromEntity(source: AdminEntity): Admin {
        const admin = new Admin(source.id);
        admin.name = source.name;
        admin.email = source.email;
        admin.phone = source.phone;
        admin.idNumber = source.idNumber;
        admin.avatar = source.avatar;
        admin.isPhoneNumberConfirmed = source.isPhoneNumberConfirmed;
        return admin;
    }

    public static toEntity(source: Admin): AdminEntity {
        const adminEntity = new AdminEntity();
        adminEntity.id = source.id;
        adminEntity.name = source.name;
        adminEntity.email = source.email;
        adminEntity.phone = source.phone;
        adminEntity.userId = source.userId;
        adminEntity.avatar = source.avatar;
        adminEntity.idNumber = source.idNumber;
        adminEntity.isPhoneNumberConfirmed = source.isPhoneNumberConfirmed;
        return adminEntity;
    }
}
