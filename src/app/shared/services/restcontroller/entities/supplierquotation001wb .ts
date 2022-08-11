import { Purchasereqslip001wb } from "./Purchasereqslip001wb";
import { Supplierquotationitems001wb } from "./Supplierquotationitems001wb";

export class Supplierquotation001wb {
  slNo?: number;
  unitdepartslNo?: number;
  supplierSlno?: number|any;
  supliername?: string;
  supliertype?: string;
  address?: string;
  quotationNo?: string;
  quotationDate?: Date;
  validity?: Date;
  personName?: string;
  desgnation?: string;
  mnumber?: number;
  mobile?: number;
  mailid?: string;
  prsno?: string;
  department?: string;
  level?: string;
  termsCondition?: string;
  // filename?: string;
  // filepath?: string;
  // originalfilename?: string;
  status?: string;
  remarks?: string;
  insertUser?: string;
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;

  supplierItems?:Supplierquotationitems001wb[];
}