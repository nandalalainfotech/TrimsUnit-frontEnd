import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Statutory001wb } from "../entities/statutory001wb";


@Injectable()
export class StatutoryPlanManager extends BaseService {
    private statutoryPlanUrl: string = `${environment.apiUrl}/statutory`



    allstuplan() {
        return this.getCallService(`${this.statutoryPlanUrl}` + "/findAll");
    }
    findNotificationAll() {
        return this.getCallService(`${this.statutoryPlanUrl}` + "/findNotificationAll");
    }
    findAllByEmployeNameId() {
        return this.getCallService(`${this.statutoryPlanUrl}` + "/findAllByEmployeNameId", );
    }
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.statutoryPlanUrl}`, data);
    }
  

    stuplansave(statutory001wb : Statutory001wb ) {
    return this.postCallService(`${this.statutoryPlanUrl}` + "/save", {}, statutory001wb );
    }
  
    stuplanUpdate(statutory001wb: Statutory001wb) {
        return this.putCallService(`${this.statutoryPlanUrl}` + "/update", {}, statutory001wb);
    }
    findAllByBankId(bslNo: any) {
        let bslno: any = {};
        bslno['bslno'] = bslNo;
        return this.getCallService(`${this.statutoryPlanUrl}` + "/findAllBylegalId", bslno);
    }

    stuplanDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.statutoryPlanUrl}` + "/delete", data);
    }


    statoryPdf() {                     

        return this.getCallService1(`${this.statutoryPlanUrl}` + "/pdf", )
        
    }
    statoryExcel() {           
        return this.getCallService1(`${this.statutoryPlanUrl}` + "/excel", )
        
    }




    // allstuplan() {
    //     return this.getCallService(`${this.statutoryPlanUrl}` + "/findAll");
    // }

    // findNotificationAll() {
    //     return this.getCallService(`${this.statutoryPlanUrl}` + "/findNotificationAll");
    // }
    // findAllByEmployeNameId(emslNo: any) {
    //     let emslno: any = {};
    //     emslno['emslno'] = emslNo;
    //     return this.getCallService(`${this.statutoryPlanUrl}` + "/findAllByEmployeNameId", emslno);
    // }
    // findOne(id: any) {
    //     let data: any = {};
    //     data['id'] = id;
    //     return this.getCallService(`${this.statutoryPlanUrl}`, data);
    // }
    // stuplansave(statutory001wb: Statutory001wb) {
    //     return this.postCallService(`${this.statutoryPlanUrl}` + "/save", {}, statutory001wb);
    // }

    // stuplanUpdate(statutory001wb: Statutory001wb) {
    //     return this.putCallService(`${this.statutoryPlanUrl}` + "/update", {}, statutory001wb);
    // }

    // stuplanDelete(id: any) {
    //     let data: any = {};
    //     data['slno'] = id;
    //     return this.deleteCallService(`${this.statutoryPlanUrl}` + "/delete", data);
    // }

   

}