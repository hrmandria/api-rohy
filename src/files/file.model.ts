import { AbstractModel } from "src/shared/models/abstract.model";

export class DatabaseFile extends AbstractModel {
    filename: string;
    data: Buffer;
}