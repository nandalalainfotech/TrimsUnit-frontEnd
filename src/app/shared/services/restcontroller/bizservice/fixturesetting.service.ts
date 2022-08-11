import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Fixture001mb } from "../entities/Fixture001mb";
import { Machine001mb } from "../entities/Machine001mb";


@Injectable()
export class FixtureSettingManager extends BaseService {
    checklistPdf() {
        throw new Error('Method not implemented.');
    }
    private fixtureUrl: string = `${environment.apiUrl}/fixtures`

    allfixture() {
        return this.getCallService(`${this.fixtureUrl}` + "/findAll");
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.fixtureUrl}`, data);
    }

    findAllSlNoAndMcode() {
        return this.getCallService(`${this.fixtureUrl}` + "/findAllSlNoAndMcode");
    }

    fixturesave(fixture001mb:Fixture001mb) {
        return this.postCallService(`${this.fixtureUrl}` + "/save", {}, fixture001mb);
    }

    fixtureupdate(fixture001mb: Fixture001mb) {
        return this.putCallService(`${this.fixtureUrl}` + "/update", {}, fixture001mb);
    }
    
    fixturedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.fixtureUrl}`+"/delete", data);
    }
    machinePdf() {
        return this.getCallService1(`${this.fixtureUrl}` + "/pdf")
    }
    machineExcel() {
        return this.getCallService1(`${this.fixtureUrl}` + "/excel")
    }
   
}