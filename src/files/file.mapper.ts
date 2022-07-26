import { DatabaseFileEntity } from "./file.entity";
import { DatabaseFile } from "./file.model";

export class FileMapper {
    public static fromEntity(source: DatabaseFileEntity) {
        const file = new DatabaseFile(source.id);
        file.filename = source.filename;
        file.data = source.data;
        return file;
    }

    public static toEntity(source: DatabaseFile): DatabaseFileEntity {
        const databaseFileEntity = new DatabaseFileEntity();
        databaseFileEntity.id = source.id;
        databaseFileEntity.filename = source.filename;
        databaseFileEntity.data = source.data;
        return databaseFileEntity;
    }
}