import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Companydetails001mb } from "../entities/Companydetails001mb";



@Injectable()
export class CompanyDetailsManager extends BaseService {

    private CompanyUrl: string = `${environment.apiUrl}/companyDetails`

    allcompany() {
        return this.getCallService(`${this.CompanyUrl}` + "/findAll");
    }

    companySave(companydetails001mb: Companydetails001mb) {
        return this.postCallService(`${this.CompanyUrl}` + "/save", {}, companydetails001mb);
    }

    companyUpdate(companydetails001mb: Companydetails001mb) {
        return this.putCallService(`${this.CompanyUrl}` + "/update", {}, companydetails001mb);
    }

    companyDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.CompanyUrl}` + "/delete", data);
    }

    findAllBycompany(companySlno: any) {
        let data: any = {};
        data['companySlno'] = companySlno;
        return this.getCallService(`${this.CompanyUrl}`, data);
    }

    companydetPdf() {
        return this.getCallService1(`${this.CompanyUrl}` + "/pdf")
    }
    companydetExcel() {
        return this.getCallService1(`${this.CompanyUrl}` + "/excel")
    }


}