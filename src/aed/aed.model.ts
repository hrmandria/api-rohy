import { AbstractModel } from "src/shared/models/abstract.model";
import { UserEntity } from "src/user/user.entity";

export class Aed extends AbstractModel {
    name: string;
    status: Status;
    idNumber: string;
    email: string;
    userId: string;
    user: UserEntity;
}

export enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}