export enum TicketType {
    ENTRANCE = 'ENTRANCE',
    EXIT = 'EXIT',
    ABSENCE = 'ABSENCE',
    SUMMONS = 'SUMMONS',
    WARNING = 'WARNING',
    PENALIZATION = 'PENALIZATION',
    CORRESPONDENCE = 'CORRESPONDENCE'
}

export class Ticket {
    from: Date;
    to: Date;
    cause: string;
    decision: string;
    pointsNumber: number;
    managerSignature: boolean;
    parentSignature: boolean;
    managerId: string;
    parentId: string;
    type: TicketType;
}