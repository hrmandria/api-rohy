import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'database_file' })
export class DatabaseFileEntity extends BaseEntity {
    @Column({ name: 'firstname', nullable: false, type: 'text' })
    public filename: string;

    @Column({ name: 'data', nullable: false, type: 'bytea' })
    public data: Buffer;
}

