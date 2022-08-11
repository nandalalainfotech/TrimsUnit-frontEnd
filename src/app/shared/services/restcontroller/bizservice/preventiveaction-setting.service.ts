import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Preventiveaction001mb } from "../entities/preventiveaction001mb";


@Injectable()
export class PreventiveactionSettingManager extends BaseService {
    private preventiveactionUrl: string = `${environment.apiUrl}/preventiveaction`

    allpreventiveaction() {
        return this.getCallService(`${this.preventiveactionUrl}` + "/findAll");
    }

    findAllbyRootCauseId(slNo: any) {
        let rcslno: any = {};
        rcslno['slNo'] = slNo;
        return this.getCallService(`${this.preventiveactionUrl}` + "/findAllbyRootCauseId", rcslno);
    }

    preventiveactionsave(preventiveaction001mb: Preventiveaction001mb) {
        return this.postCallService(`${this.preventiveactionUrl}` + "/save", {}, preventiveaction001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.preventiveactionUrl}`, data);
    }

    preventiveactionupdate(preventiveaction001mb: Preventiveaction001mb) {
        return this.putCallService(`${this.preventiveactionUrl}` + "/update", {}, preventiveaction001mb);
    }

    preventiveactiondelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.preventiveactionUrl}` + "/delete", data);
    }
    preventPdf() {
        return this.getCallService1(`${this.preventiveactionUrl}` + "/pdf")
    }
    preventExcel() {
        return this.getCallService1(`${this.preventiveactionUrl}` + "/excel")
    }
}