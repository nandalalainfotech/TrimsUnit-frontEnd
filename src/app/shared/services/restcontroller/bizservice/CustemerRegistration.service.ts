import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Custemerregistration001mb } from "../entities/Custemerregistration001mb";



@Injectable()
export class CustmerRegManager extends BaseService {
    private CustmerRegUrl: string = `${environment.apiUrl}/custemerReg`

    allCustmerreg() {
        return this.getCallService(`${this.CustmerRegUrl}` + "/findAll");
    }

    findAllSlNoAndSuppcode() {
        return this.getCallService(`${this.CustmerRegUrl}` + "/findAllSlNoAndSuppcode");
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.CustmerRegUrl}`, data);
    }

    CustmerregSave(custemerregistration001mb: Custemerregistration001mb) {
        return this.postCallService(`${this.CustmerRegUrl}` + "/save", {}, custemerregistration001mb);
    }

    CustmerregUpdate(custemerregistration001mb: Custemerregistration001mb) {
        return this.putCallService(`${this.CustmerRegUrl}` + "/update", {}, custemerregistration001mb);
    }

    CustmerregDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.CustmerRegUrl}` + "/delete", data);
    }

    CustmerregPdf() {     
        return this.getCallService1(`${this.CustmerRegUrl}` + "/pdf")
    }
    CustmerregExcel() {
        console.log("response,controller")
        return this.getCallService1(`${this.CustmerRegUrl}` + "/excel")
    }



}