import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Preventiveplan001wb } from "../entities/preventiveplan001wb";

@Injectable()
export class PreventivePlanManager extends BaseService {
    static findAllByDashboard() {
      throw new Error('Method not implemented.');
    }
    private preventivePlanUrl: string = `${environment.apiUrl}/preventiveplan`

    allpreplan() {
        return this.getCallService(`${this.preventivePlanUrl}` + "/findAll");
    }

    findNotificationAll() {
        return this.getCallService(`${this.preventivePlanUrl}` + "/findNotificationAll");
    }

    findAllByMachineId(mslNo: any) {
        let mslno: any = {};
        mslno['mslno'] = mslNo;
        return this.getCallService(`${this.preventivePlanUrl}` + "/findAllByMachineId", mslno);
    }
    findAllByDashboard() {
        // let mslno: any = {};
        // mslno['mslno'] = mslNo;
        
        return this.getCallService(`${this.preventivePlanUrl}` + "/findAllByDashboard");
    }


    preplansave(preventiveplan001wb: Preventiveplan001wb) {
        return this.postCallService(`${this.preventivePlanUrl}` + "/save", {}, preventiveplan001wb);
    }

    preplanUpdate(preventiveplan001wb: Preventiveplan001wb) {
        return this.putCallService(`${this.preventivePlanUrl}` + "/update", {}, preventiveplan001wb);
    }

    preplanDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.preventivePlanUrl}` + "/delete", data);
    }
    prePlanPdf(mslNo: any) {
        let mslno: any = {};
        mslno['mslno'] = mslNo;
        return this.getCallService1(`${this.preventivePlanUrl}` + "/pdf", mslNo)
    }
    prePlanExcel(mslNo: any) {
        let mslno: any = {};
        mslno['mslno'] = mslNo;
        return this.getCallService1(`${this.preventivePlanUrl}` + "/excel", mslNo)
    }
}