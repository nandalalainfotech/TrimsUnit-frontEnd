import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Prod001mb } from "../entities/prod001mb";


@Injectable()
export class ProdManager extends BaseService {
    private ProdUrl: string = `${environment.apiUrl}/prod`
    

    allprod() {
        return this.getCallService(`${this.ProdUrl}` + "/findAll");
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.ProdUrl}`, data);
    }

    prodSave(prod001mb: Prod001mb) {
        return this.postCallService(`${this.ProdUrl}` + "/save", {}, prod001mb);
    }

    prodUpdate(prod001mb: Prod001mb) {        
        return this.putCallService(`${this.ProdUrl}` + "/update", {}, prod001mb);
    }

    prodDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.ProdUrl}` + "/delete", data);
    }

    prodPdf() {
        return this.getCallService1(`${this.ProdUrl}` + "/pdf")
    }
    prodExcel() {
        return this.getCallService1(`${this.ProdUrl}` + "/excel")
    }
}