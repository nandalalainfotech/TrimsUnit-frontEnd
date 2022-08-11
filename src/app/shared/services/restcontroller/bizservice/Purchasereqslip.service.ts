import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purchasereqslip001wb } from "../entities/Purchasereqslip001wb";


@Injectable()
export class PurchasereqslipManager extends BaseService {

    private PurchasereqslipUrl: string = `${environment.apiUrl}/purchasereq`

    allpurchaseslip() {
        return this.getCallService(`${this.PurchasereqslipUrl}` + "/findAll");
    }

    purchaseslipsave(purchasereqslip001wb: Purchasereqslip001wb) {
        console.log("purchasereqslip001wb-->", purchasereqslip001wb);
        return this.postCallService(`${this.PurchasereqslipUrl}` + "/save", {}, purchasereqslip001wb);
    }

    purchaseslipupdate(purchasereqslip001wb: Purchasereqslip001wb) {
        return this.putCallService(`${this.PurchasereqslipUrl}` + "/update", {}, purchasereqslip001wb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.PurchasereqslipUrl}`, data);
    }
    
    updatereqslip(approvel:any, pchaseslno:any, remarks:any) {
        let data: any = {};
        data['approvel'] = approvel;
        data['pchaseslno'] = pchaseslno;
        data['remarks'] = remarks;
        return this.getCallService(`${this.PurchasereqslipUrl}` + "/updatereqslip", data);
    }

    getCount() {
        return this.getCallService(`${this.PurchasereqslipUrl}` + "/getCount");
    }

    purchaseslipdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.PurchasereqslipUrl}` + "/delete", data);
    }

    purchaslipPdf() {
        return this.getCallService1(`${this.PurchasereqslipUrl}` + "/pdf")
    }
    pdfId(id: any) {
        let data: any = {};
        data['id'] = id;
        console.log("data", data);
        return this.getCallService1(`${this.PurchasereqslipUrl}` + "/pdf", data)
    }

    purchaslipExcel() {
        return this.getCallService1(`${this.PurchasereqslipUrl}` + "/excel")
    }
    ExcelId(id: any) {
        let data: any = {};
        data['id'] = id;
        console.log("data", data);
        return this.getCallService1(`${this.PurchasereqslipUrl}` + "/excel", data)
    }

    approvalStatus() {
        return this.getCallService(`${this.PurchasereqslipUrl}` + "/approvalStatus");
    }

    submitStatusUpdate() {
        return this.getCallService(`${this.PurchasereqslipUrl}` + "/submitStatusUpdate/", );
    }

}