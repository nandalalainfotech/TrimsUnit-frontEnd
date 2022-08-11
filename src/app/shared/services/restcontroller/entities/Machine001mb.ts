import { BaseEntity } from "./BaseEntity";

export class Machine001mb {
    slNo?: number;
    unitdepartslNo?: number;
    sslno?: number;
    mcode?: string;
    mname?: string;
    year?: Date | null;
    capacity?: string;
    mtype?: string;
    make?: string;
    location?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
}