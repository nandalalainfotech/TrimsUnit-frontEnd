import { Purchasereqitem001wb } from "./purchasereqitems001wb";
import { Spares001mb } from "./spares001mb";

export class Purchasereqslip001wb {
    slNo?: number;
    unitdepartslNo?: number;
    date?: Date;
    prsNo?: string | any;
    poDate?: Date;
    reqDate?: Date;
    poNo?: string;
    remarks?: string;
    status?: string;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    purchasereqitem?: Purchasereqitem001wb[];
}
