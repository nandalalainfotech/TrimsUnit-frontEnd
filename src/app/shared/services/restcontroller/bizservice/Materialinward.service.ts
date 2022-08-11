import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Materialinward001wb } from "../entities/Materialinward001wb";


@Injectable()
export class MaterialInwardManager extends BaseService {

    private MaterialInwardUrl: string = `${environment.apiUrl}/materialinward`

    allinward() {
        return this.getCallService(`${this.MaterialInwardUrl}` + "/findAll");
    }

    getCount() {
        return this.getCallService(`${this.MaterialInwardUrl}` + "/getCount");
    }

   findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.MaterialInwardUrl}`, data);
    }

    inwardSave(materialinward001wb: Materialinward001wb) {
        return this.postCallService(`${this.MaterialInwardUrl}` + "/save", {}, materialinward001wb);
    }

    inwardUpdate(materialinward001wb: Materialinward001wb) {
        return this.putCallService(`${this.MaterialInwardUrl}` + "/update", {}, materialinward001wb);
    }

    inwardDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.MaterialInwardUrl}` + "/delete", data);
    }


    materialinwardPdf() {
        return this.getCallService1(`${this.MaterialInwardUrl}` + "/pdf")
    }
    materialinwardExcel() {
        return this.getCallService1(`${this.MaterialInwardUrl}` + "/excel")
    }


}