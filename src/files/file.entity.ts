import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';


@Entity()
class DatabaseFileEntity extends BaseEntity {
    @Column({ name: 'firstname', nullable: false, type: 'text' })
    filename: string;

    @Column({ name: 'data', nullable: false, type: 'bytea' })
    data: Uint8Array;
}

export default DatabaseFileEntity;