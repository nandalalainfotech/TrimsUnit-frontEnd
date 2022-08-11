import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplierregistration001mb } from "../entities/supplierRegistration001mb";


@Injectable()
export class SupplierRegManager extends BaseService {
    private SupplierRegUrl: string = `${environment.apiUrl}/supplierReg`

    allSupplier() {
        return this.getCallService(`${this.SupplierRegUrl}` + "/findAll");
    }

    findAllSlNoAndSuppcode() {
        return this.getCallService(`${this.SupplierRegUrl}` + "/findAllSlNoAndSuppcode");
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.SupplierRegUrl}`, data);
    }

    supplierSave(supplierreg001mb: Supplierregistration001mb) {
        return this.postCallService(`${this.SupplierRegUrl}` + "/save", {}, supplierreg001mb);
    }

    supplierUpdate(supplierreg001mb: Supplierregistration001mb) {
        return this.putCallService(`${this.SupplierRegUrl}` + "/update", {}, supplierreg001mb);
    }

    supplierDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.SupplierRegUrl}` + "/delete", data);
    }

    suplregPdf() {     
        return this.getCallService1(`${this.SupplierRegUrl}` + "/pdf")
    }
    suplregExcel() {
        console.log("response,controller")
        return this.getCallService1(`${this.SupplierRegUrl}` + "/excel")
    }

    getCount() {
        return this.getCallService(`${this.SupplierRegUrl}` + "/getCount");
    }



}