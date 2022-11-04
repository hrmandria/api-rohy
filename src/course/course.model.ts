import { AbstractModel } from "src/shared/models/abstract.model";

export class Course extends AbstractModel {
  subject: string;
  grade: string;
  teacher: string;
  day: DayType;
  from: Date;
  to: Date;
}

export enum DayType {
  MONDAY = "LUNDI",
  TUESDAY = "MARDI",
  WEDNESDAY = "MERCREDI",
  THURSDAY = "JEUDI",
  FRIDAY = "VENDREDI"
}
