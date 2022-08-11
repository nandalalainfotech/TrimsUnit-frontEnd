import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Emp001mb } from "../entities/employeedetails.mb";
import { Legal001mb } from "../entities/legaldocuments.mb";


@Injectable()
export class LegalDocumentsManager extends BaseService {
    private LegalUrl: string = `${environment.apiUrl}/legaldocuments`


    alllegal() {
        return this.getCallService(`${this.LegalUrl}` + "/findAll");
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.LegalUrl}`, data);
    }
  
    legalSave(legal001mb: Legal001mb) {

        return this.postCallService(`${this.LegalUrl}` + "/save", {}, legal001mb);
    }

    legalUpdate(legal001mb: Legal001mb) {
        return this.putCallService(`${this.LegalUrl}` + "/update", {}, legal001mb);
    }
 

    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

    
    legalDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.LegalUrl}` + "/delete", data);
    }
   


    legaldocPdf() {
        // let mslno: any = {};
        // mslno['mslno'] = mslNo;
        return this.getCallService1(`${this.LegalUrl}` + "/pdf")
    }
    legaldocExcel() {
        console.log("response,controller")
        // let mslno: any = {};
        // mslno['mslno'] = mslNo;
        return this.getCallService1(`${this.LegalUrl}` + "/excel")
    }


}