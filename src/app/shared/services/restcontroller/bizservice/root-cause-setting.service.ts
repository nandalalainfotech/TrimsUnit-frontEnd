import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Rootcause001mb } from "../entities/Rootcause001mb";

@Injectable()
export class RootCauseSettingManager extends BaseService {

    private rootcausesettingUrl: string = `${environment.apiUrl}/rootcause`

    allrootcause() {
        return this.getCallService(`${this.rootcausesettingUrl}` + "/findAll");
    }

    findAllbyBreakDownId(slNo: any) {
        let bdslno: any = {};
        bdslno['slNo'] = slNo;
        return this.getCallService(`${this.rootcausesettingUrl}` + "/findAllbyBreakDownId", bdslno);
    }

    rootcausesave(rootcause001mb: Rootcause001mb) {
        return this.postCallService(`${this.rootcausesettingUrl}` + "/save", {}, rootcause001mb);
    }

    rootcauseupdate(rootcause001mb: Rootcause001mb) {
        return this.putCallService(`${this.rootcausesettingUrl}` + "/update", {}, rootcause001mb);
    }

    rootcausedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.rootcausesettingUrl}` + "/delete", data);
    }
    rootcausePdf() {
        return this.getCallService1(`${this.rootcausesettingUrl}` + "/pdf")
    }
    rootcauseExcel() {
        return this.getCallService1(`${this.rootcausesettingUrl}` + "/excel")
    }
}