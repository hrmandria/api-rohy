import { DatabaseFileEntity } from "src/files/file.entity";
import { AbstractModel } from "src/shared/models/abstract.model";

export class Admin extends AbstractModel {
    name: string;
    userId: string;
    email: string;
    phone: string;
    idNumber: string;
    avatar: DatabaseFileEntity;
    isPhoneNumberConfirmed: boolean
  }