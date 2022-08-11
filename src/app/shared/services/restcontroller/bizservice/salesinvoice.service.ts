import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Salesinvoice001wb } from "../entities/Salesinvoice001wb";




@Injectable()
export class SalesInvoiceManager extends BaseService {

    private salesinvoicerUrl: string = `${environment.apiUrl}/salesinvocie`

    allsalesinvoice() {
        return this.getCallService(`${this.salesinvoicerUrl}` + "/findAll");
    }

    salesinvoicesave(salesinvoice001wb: Salesinvoice001wb) {
        return this.postCallService(`${this.salesinvoicerUrl}` + "/save", {}, salesinvoice001wb);
    }

    salesinvoiceupdate(salesinvoice001wb: Salesinvoice001wb) {
        return this.putCallService(`${this.salesinvoicerUrl}` + "/update", {}, salesinvoice001wb);
    }
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.salesinvoicerUrl}`, data);
    }

    salesinvoicedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.salesinvoicerUrl}` + "/delete", data);
    }

    salesinvoicePdf() {
        return this.getCallService1(`${this.salesinvoicerUrl}` + "/pdf")
    }

    salesinvoiceParamsPdf(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService1(`${this.salesinvoicerUrl}` + "/pdf", data);
    }
    salesinvoiceExcel() {
        return this.getCallService1(`${this.salesinvoicerUrl}` + "/excel")
    }
   
    salesinvoicesingleExcel(id:any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService1(`${this.salesinvoicerUrl}` + "/excel", data)
    }

    getCount() {
        return this.getCallService(`${this.salesinvoicerUrl}` + "/getCount");
    }

}