import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Bank001mb } from "../entities/bank001mb";



@Injectable()
export class BankNameManager extends BaseService {
    private bankfUrl: string = `${environment.apiUrl}/bank`

    allbank() {
        return this.getCallService(`${this.bankfUrl}` + "/findAll");
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.bankfUrl}`, data);
    }

    banksave(bank001mb: Bank001mb) {
        return this.postCallService(`${this.bankfUrl}` + "/save", {}, bank001mb);
    }

    bankupdate(bank001mb: Bank001mb) {
        return this.putCallService(`${this.bankfUrl}` + "/update", {}, bank001mb);
    }
    
    bankdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.bankfUrl}`+"/delete", data);
    }

}