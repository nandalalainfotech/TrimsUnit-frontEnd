import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Employef001mb } from "../entities/employef001mb";


@Injectable()
export class EmployeFecilityManager extends BaseService {
    private employfUrl: string = `${environment.apiUrl}/employef`

    allemployef() {
        return this.getCallService(`${this.employfUrl}` + "/findAll");
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.employfUrl}`, data);
    }

    employefsave(employef001mb: Employef001mb) {
        return this.postCallService(`${this.employfUrl}` + "/save", {}, employef001mb);
    }

    employefupdate(employef001mb: Employef001mb) {
        return this.putCallService(`${this.employfUrl}` + "/update", {}, employef001mb);
    }
    
    employefdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.employfUrl}`+"/delete", data);
    }



    empfclPdf() {
        // let mslno: any = {};
        // mslno['mslno'] = mslNo;
        return this.getCallService1(`${this.employfUrl}` + "/pdf")
    }
    empfclExcel() {
        console.log("response,controller")
        // let mslno: any = {};
        // mslno['mslno'] = mslNo;
        return this.getCallService1(`${this.employfUrl}` + "/excel")
    }

}