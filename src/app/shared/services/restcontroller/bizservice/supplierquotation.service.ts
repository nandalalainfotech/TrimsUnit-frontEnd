import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplierquotation001wb } from "../entities/supplierquotation001wb ";



@Injectable()
export class SupplierQuotationManager extends BaseService {
    private SupplierQuotationUrl: string = `${environment.apiUrl}/supquotation`

    allSupplierQuotation() {
        return this.getCallService(`${this.SupplierQuotationUrl}` + "/findAll");
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.SupplierQuotationUrl}`, data);
    }

    SupplierQuotationSave(supplierquotation001wb: Supplierquotation001wb) {
        return this.postCallService(`${this.SupplierQuotationUrl}` + "/save", {}, supplierquotation001wb);
    }

    // SupplierQuotationSave(supplierquotation001wb: Supplierquotation001wb, selectedFile: any ) {
    //     let formData: any = new FormData();
    //     formData.append("file", selectedFile, selectedFile.name);
    //     formData.append("contenttype", "contenttype");
    //     formData.append("filename", selectedFile.name);

    //     formData.append("supplierSlno", supplierquotation001wb.supplierSlno);
    //     formData.append("supliername", supplierquotation001wb.supliername);
    //     formData.append("supliertype", supplierquotation001wb.supliertype);
    //     formData.append("address", supplierquotation001wb.address);
    //     formData.append("quotationNo", supplierquotation001wb.quotationNo);
    //     formData.append("validity", supplierquotation001wb.validity);
    //     formData.append("quotationDate", supplierquotation001wb.quotationDate);
    //     formData.append("personName", supplierquotation001wb.personName);
    //     formData.append("desgnation", supplierquotation001wb.desgnation);
    //     formData.append("mnumber", supplierquotation001wb.mnumber);
    //     formData.append("mobile", supplierquotation001wb.mobile);
    //     formData.append("mailid", supplierquotation001wb.mailid);
    //     formData.append("prsno", supplierquotation001wb.prsno);
    //     formData.append("department", supplierquotation001wb.department);
    //     formData.append("level", supplierquotation001wb.level);
    //     formData.append("termsCondition", supplierquotation001wb.termsCondition);
    //     console.log("supplierquotation001wb.supplierItems",supplierquotation001wb.supplierItems);
        
    //     formData.append("supplierItems",supplierquotation001wb.supplierItems);
    //     formData.append("filepath", supplierquotation001wb.filepath);
    //     formData.append("insertUser", supplierquotation001wb.insertUser);
    //     formData.append("insertDatetime", new Date());
    //     // supplierquotation001wb.supplierItems = this.supplierItems;
    //     formData.append("updatedUser", supplierquotation001wb.updatedUser);
    //     formData.append("updatedDatetime", new Date());
    //     console.log("formData",formData);
        
    //     return this.postCallService(`${this.SupplierQuotationUrl}` + "/save", {}, formData).pipe(
    //         catchError(this.errorMgmt)
    //     )

    // }
    
    // errorMgmt(error: HttpErrorResponse) {
    //     let errorMessage = '';
    //     if (error.error instanceof ErrorEvent) {
    //         errorMessage = error.error.message;
    //     } else {
    //         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    //     }
    //     return throwError(errorMessage);
    // }

    SupplierQuotationUpdate(supplierquotation001wb: Supplierquotation001wb) {
        return this.putCallService(`${this.SupplierQuotationUrl}` + "/update", {}, supplierquotation001wb);
    }

    UpdateSupplierQuotation(approvel:any, pchaseslno:any, remarks:any) {
        let data: any = {};
        data['approvel'] = approvel;
        data['pchaseslno'] = pchaseslno;
        data['remarks'] = remarks;
        return this.getCallService(`${this.SupplierQuotationUrl}` + "/UpdateSupplierQuotation", data);
    }

    SupplierQuotationDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.SupplierQuotationUrl}` + "/delete", data);
    }


    supplierQuotationPdf() {
        return this.getCallService1(`${this.SupplierQuotationUrl}` + "/pdf")
    }
    paramsPdf(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService1(`${this.SupplierQuotationUrl}` + "/pdf", data);
    }
    supplierQuotationExcel() {
        return this.getCallService1(`${this.SupplierQuotationUrl}` + "/excel")
    }

    supplierExcel(id:any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService1(`${this.SupplierQuotationUrl}` + "/excel", data)
    }

   

}