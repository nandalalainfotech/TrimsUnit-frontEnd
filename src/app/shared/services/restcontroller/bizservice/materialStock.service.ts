import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { MaterialStock001wb } from "../entities/stock001wb";


@Injectable()
export class MaterialStockManager extends BaseService {

    private MaterialStockUrl: string = `${environment.apiUrl}/materialstock`

    materialstockfindall() {
        return this.getCallService(`${this.MaterialStockUrl}` + "/findAll");
    }


    materialstockSave(materialStock001wb: MaterialStock001wb) {        
        return this.postCallService(`${this.MaterialStockUrl}` + "/save", {}, materialStock001wb);
    }

    materialstockUpdate(materialStock001wb: MaterialStock001wb) {
        return this.putCallService(`${this.MaterialStockUrl}` + "/update", {}, materialStock001wb);
    }

    materialstockDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.MaterialStockUrl}` + "/delete", data);
    }


    materialstockPdf() {
        return this.getCallService1(`${this.MaterialStockUrl}` + "/pdf")
    }
    materialstockExcel() {
        return this.getCallService1(`${this.MaterialStockUrl}` + "/excel")
    }


}