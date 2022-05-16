import { UserEntity } from "src/user/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { TicketType } from "./ticket.model";

@Entity({ name: 'ticket' })
export class TicketEntity extends BaseEntity {
    @Column({ name: 'from', nullable: false, type: 'date' })
    public from: Date;

    @Column({ name: 'to', nullable: true, type: 'date' })
    public to: Date;

    @Column({ name: 'cause', nullable: false, type: 'text' })
    public cause: string

    @Column({ name: 'decision', nullable: true, type: 'text' })
    public decision: string

    @Column({ name: 'pointsNumber', nullable: true, type: 'integer' })
    public pointsNumber: number

    @Column({ name: 'managerSignature', nullable: true, type: 'text' })
    public managerSignature: boolean

    @Column({ name: 'parentSignature', nullable: true, type: 'text' })
    public parentSignature: boolean

    @Column({ name: 'type', nullable: false, type: 'text', enum: TicketType })
    public type: TicketType

    @Column({ name: 'managerId', nullable: false, type: 'text' })
    public managerId: string;

    @Column({ name: 'parentId', nullable: false, type: 'text' })
    public parentId: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

}