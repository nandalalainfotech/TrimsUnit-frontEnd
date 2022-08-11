import { Salesorder001wb } from "./Salesorder001wb";

export class Payment001wb {
    slNo?: number;
    unitdepartslNo?: number;
    saleorderSlno?: number;
    payDate?: Date;
    payStatus?: string;
    dueDate?: Date;
    gstNo?: number;
    gstPercent?: string;
    gstAmount?: number;
    totalAmount?: number;
    remarks?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    saleorderSlno2?: Salesorder001wb;
}