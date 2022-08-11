import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Spares001mb } from "../entities/spares001mb";

@Injectable()
export class SparesettingManager extends BaseService {
   
    private sparesettingUrl: string = `${environment.apiUrl}/spare`
    allsparesetting() {
        return this.getCallService(`${this.sparesettingUrl}`+"/findAll");
    }
    sparesave(spares001mb: Spares001mb) {
        return this.postCallService(`${this.sparesettingUrl}` + "/save", {}, spares001mb);
    }
    spareupdate(spares001mb: Spares001mb) {
        return this.putCallService(`${this.sparesettingUrl}` + "/update", {}, spares001mb);
    }
    sparedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.sparesettingUrl}`+"/delete",data);
    }
    sparePdf() {
        return this.getCallService1(`${this.sparesettingUrl}` + "/pdf")
    }
    spareExcel() {
        return this.getCallService1(`${this.sparesettingUrl}` + "/excel")
    }
}