import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purchaseorder001wb } from "../entities/Purchaseorder001wb";



@Injectable()
export class PurchaseorderManager extends BaseService {

    private PurchaseorderUrl: string = `${environment.apiUrl}/order`

    allpurchaseorder() {
        return this.getCallService(`${this.PurchaseorderUrl}` + "/findAll");
    }

    purchaseordersave(purchaseorder001wb: Purchaseorder001wb) {
        return this.postCallService(`${this.PurchaseorderUrl}` + "/save", {}, purchaseorder001wb);
    }

    purchaseorderupdate(purchaseorder001wb: Purchaseorder001wb) {
        return this.putCallService(`${this.PurchaseorderUrl}` + "/update", {}, purchaseorder001wb);
    }
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.PurchaseorderUrl}`, data);
    }
    findById(purchseId: any) {
        let data: any = {};
        data['purchseId'] = purchseId;
        return this.getCallService(`${this.PurchaseorderUrl}`, data);
    }
    findAllByMetrialId(purchseslNo: any) {
        let data: any = {};
        data['purchseslNo'] = purchseslNo;
        return this.getCallService(`${this.PurchaseorderUrl}`, data);
    }
    UpdatePO(approvel:any, pchaseslno:any, remarks:any) {
        let data: any = {};
        data['approvel'] = approvel;
        data['pchaseslno'] = pchaseslno;
        data['remarks'] = remarks;
        return this.getCallService(`${this.PurchaseorderUrl}` + "/UpdatePO", data);
    }

    purchaseorderdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.PurchaseorderUrl}` + "/delete", data);
    }

    purchaseorderPdf() {
        return this.getCallService1(`${this.PurchaseorderUrl}` + "/pdf")
    }

    purchaseParamsPdf(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService1(`${this.PurchaseorderUrl}` + "/pdf", data);
    }
    purchaseorderExcel() {
        return this.getCallService1(`${this.PurchaseorderUrl}` + "/excel")
    }
   
    purchaseordersingleExcel(id:any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService1(`${this.PurchaseorderUrl}` + "/excel", data)
    }

    getCount() {
        return this.getCallService(`${this.PurchaseorderUrl}` + "/getCount");
    }

}