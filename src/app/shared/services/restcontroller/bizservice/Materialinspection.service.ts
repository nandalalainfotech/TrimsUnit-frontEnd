import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Materialinspection001wb } from "../entities/MaterialInspection001wb";


@Injectable()
export class MaterialInspectionManager extends BaseService {

    private MaterialInspectionUrl: string = `${environment.apiUrl}/materialinspect`

    materialinspectionfindall() {
        return this.getCallService(`${this.MaterialInspectionUrl}` + "/findAll");
    }


    materialinspectionSave(materialinspection001wb: Materialinspection001wb) {
        
        return this.postCallService(`${this.MaterialInspectionUrl}` + "/save", {}, materialinspection001wb);
    }

    materialinspectionUpdate(materialinspection001wb: Materialinspection001wb) {
        return this.putCallService(`${this.MaterialInspectionUrl}` + "/update", {}, materialinspection001wb);
    }

    materialinspectionDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.MaterialInspectionUrl}` + "/delete", data);
    }


    materialinspectionPdf() {
        return this.getCallService1(`${this.MaterialInspectionUrl}` + "/pdf")
    }
    materialinspectionExcel() {
        return this.getCallService1(`${this.MaterialInspectionUrl}` + "/excel")
    }

    getCount() {
        return this.getCallService(`${this.MaterialInspectionUrl}` + "/getCount");
    }


}