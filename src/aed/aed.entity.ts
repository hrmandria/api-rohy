import { BaseEntity } from "src/shared/entities/base.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { Status } from "./aed.model";

@Entity('aed')
export class AedEntity extends BaseEntity {
    @Column({ name: 'name', nullable: false, type: 'text' })
    public name: string;

    @Column({ name: 'status', nullable: false, type: 'text' })
    public status: Status;

    @Column({ name: 'id_number', nullable: false, type: 'text' })
    public idNumber: string;

    @Column({ name: 'email', nullable: true, type: 'text' })
    public email: string;

    @Column({ name: 'user_id', nullable: false, type: 'text' })
    public userId: string;

    @OneToOne(() => UserEntity, user => user.id)
    public user: UserEntity;
}