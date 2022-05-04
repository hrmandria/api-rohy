import * as uuid from 'uuid';

export class AbstractModel {
  private internalId: string;

  get id(): string {
    return this.internalId;
  }

  constructor(id?: string) {
    this.internalId = id ?? uuid.v4();
  }
}
