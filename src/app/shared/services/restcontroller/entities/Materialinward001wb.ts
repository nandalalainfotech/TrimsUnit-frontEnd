import { Materialreceiveditem001wb } from "./Materialreceiveditem001wb";

export class Materialinward001wb {
    slNo?: number;
    unitdepartslNo?: number;
    purchseSlno?: number;
    date?: Date;
    dcNo?: string;
    invoiceno?: string;
    grm?: string;
    dcDate?: Date;
    supliername?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    metriealitems?: Materialreceiveditem001wb[];
}