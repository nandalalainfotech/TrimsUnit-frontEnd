import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Machine001mb } from "../entities/Machine001mb";

@Injectable()
export class MachineSettingManager extends BaseService {
    checklistPdf() {
        throw new Error('Method not implemented.');
    }
    private machineUrl: string = `${environment.apiUrl}/machines`

    allmachine() {
        return this.getCallService(`${this.machineUrl}` + "/findAll");
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.machineUrl}`, data);
    }

    findAllSlNoAndMcode() {
        return this.getCallService(`${this.machineUrl}` + "/findAllSlNoAndMcode");
    }

    machinesave(machine001mb: Machine001mb) {
        return this.postCallService(`${this.machineUrl}` + "/save", {}, machine001mb);
    }

    machineupdate(machine001mb: Machine001mb) {
        return this.putCallService(`${this.machineUrl}` + "/update", {}, machine001mb);
    }
    
    machinedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.machineUrl}`+"/delete", data);
    }
    machinePdf() {
        return this.getCallService1(`${this.machineUrl}` + "/pdf")
    }
    machineExcel() {
        return this.getCallService1(`${this.machineUrl}` + "/excel")
    }
   
}