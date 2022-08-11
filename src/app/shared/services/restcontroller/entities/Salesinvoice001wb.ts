import { Custemer001wb } from "./Custemer001wb";
import { Custemerregistration001mb } from "./Custemerregistration001mb";

export class Salesinvoice001wb {
    slNo?: number;
    unitdepartslNo?: number;
    custmrSlno?: number;
    consignee?: string;
    date?: Date;
    refno?: string;
    pono?: string;
    remarks?: string | null;
    statusSlno?: number | null;
    otherRef?: string;
    dispatchThrough?: string;
    destination?: string;
    termsDelivery?: string;
    supplierFrom?: string;
    hsn?: string;
    dueOn?: Date;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    custmrSlno2?:Custemerregistration001mb;
    custemerSlno2?: Custemer001wb[];
} 