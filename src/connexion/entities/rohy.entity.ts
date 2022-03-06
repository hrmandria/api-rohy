import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class rohydb{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    matricule: number;
}