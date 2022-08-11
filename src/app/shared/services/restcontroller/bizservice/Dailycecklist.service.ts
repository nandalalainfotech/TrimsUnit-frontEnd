import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Dailychecklist001wb } from "../entities/Dailychecklist001wb";

@Injectable()
export class DailyChecklistManager extends BaseService {
    private dailychecklistUrl: string = `${environment.apiUrl}/dailychecklist`

    alldailychecklist() {
        return this.getCallService(`${this.dailychecklistUrl}` + "/findAll");
    }

    findAllByMachineId(mslNo: any) {
        let mslno: any = {};
        mslno['mslno'] = mslNo;
        return this.getCallService(`${this.dailychecklistUrl}` + "/findAllByMachineId", mslno,);
    }

    dailychecklistsave(dailychecklist001wb: Dailychecklist001wb) {
        return this.postCallService(`${this.dailychecklistUrl}` + "/save", {}, dailychecklist001wb);
    }

    dailychecklistupdate(dailychecklist001wb: Dailychecklist001wb) {
        return this.putCallService(`${this.dailychecklistUrl}` + "/update", {}, dailychecklist001wb);
    }

    dailychecklistdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.dailychecklistUrl}`+"/delete", data);
    }

    dailyCheckPdf(mslNo: any) {
        let mslno: any = {};
        mslno['mslno'] = mslNo;
        return this.getCallService1(`${this.dailychecklistUrl}` + "/pdf", mslNo)
    }

    dailyCheckExcel(mslNo: any) {
        let mslno: any = {};
        mslno['mslno'] = mslNo;
        return this.getCallService1(`${this.dailychecklistUrl}` + "/excel", mslNo)
    }
}