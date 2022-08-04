import { AedEntity } from "./aed.entity";
import { Aed } from "./aed.model";

export class AedMapper {
    public static toEntity(source: Aed): AedEntity {
        const aedEntity = new AedEntity();
        aedEntity.id = source.id;
        aedEntity.name = source.name;
        aedEntity.status = source.status;
        aedEntity.email = source.email;
        aedEntity.idNumber = source.idNumber;
        aedEntity.userId = source.userId;
        return aedEntity;
    }

    public static fromEntity(source: AedEntity): Aed {
        const aed = new Aed(source.id)
        aed.name = source.name;
        aed.status = source.status;
        aed.idNumber = source.idNumber;
        aed.userId = source.userId;
        aed.user = source.user;
        return aed;
    }
}