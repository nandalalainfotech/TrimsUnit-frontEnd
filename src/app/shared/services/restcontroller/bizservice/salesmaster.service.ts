import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Salesitem001mb } from "../entities/Salesitemmb";
import { Salesorder001wb } from "../entities/Salesorder001wb";

@Injectable()

export class SalesMasterManager extends BaseService {
    private SalesMasterUrl: string = `${environment.apiUrl}/sale`

    allproduct() {
        return this.getCallService(`${this.SalesMasterUrl}` + "/findAll");
    }

    productSave(salesitem001mb: Salesitem001mb) {
        return this.postCallService(`${this.SalesMasterUrl}` + "/save", {}, salesitem001mb);
    }
    getCount(){
        return this.getCallService(`${this.SalesMasterUrl}` + "/getCount");
       }
  

    productUpdate(salesitem001mb: Salesitem001mb) {
        return this.putCallService(`${this.SalesMasterUrl}` + "/update", {}, salesitem001mb);
    }

    productDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.SalesMasterUrl}` + "/delete", data);
    }

    findOne(custemerSlno: any) {
        let data: any = {};
        data['custemerSlno'] = custemerSlno;
        return this.getCallService(`${this.SalesMasterUrl}`, data);
    }

    

   
    productPdf() {
        return this.getCallService1(`${this.SalesMasterUrl}` + "/pdf")
    }
    productExcel() {
        return this.getCallService1(`${this.SalesMasterUrl}` + "/excel")
    }
}