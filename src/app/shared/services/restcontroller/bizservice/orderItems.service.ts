import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Orderitem001mb } from "../entities/Orderitem001mb";





@Injectable()
export class OrderItemSettingManager extends BaseService {
    private itemUrl: string = `${environment.apiUrl}/item`
    

    allitem() {
        return this.getCallService(`${this.itemUrl}` + "/findAll");
    }

    findOne(orderslno: any) {
        let data: any = {};
        data['orderslno'] = orderslno;
        return this.getCallService(`${this.itemUrl}`, data);
    }
    
    getCount(){
      return this.getCallService(`${this.itemUrl}` + "/getCount");
     }

    itemSave(orderitem001mb: Orderitem001mb) {
        
        return this.postCallService(`${this.itemUrl}` + "/save", {}, orderitem001mb);
    }

    itemUpdate(orderitem001mb: Orderitem001mb) {        
        return this.putCallService(`${this.itemUrl}` + "/update", {}, orderitem001mb);
    }

    itemDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.itemUrl}` + "/delete", data);
    }

    itemPdf() {
        return this.getCallService1(`${this.itemUrl}` + "/pdf")
    }
    itemExcel() {
        return this.getCallService1(`${this.itemUrl}` + "/excel")
    }

}