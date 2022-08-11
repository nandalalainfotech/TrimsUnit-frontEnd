import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { CustemerAddManager } from '../services/restcontroller/bizservice/Custemer-wb.service';
import { OrderItemManager } from '../services/restcontroller/bizservice/orderitem-wb.service';
import { SalesMasterManager } from '../services/restcontroller/bizservice/salesmaster.service';
import { Custemer001wb } from '../services/restcontroller/entities/Custemer001wb';
import { Salesitem001mb } from '../services/restcontroller/entities/Salesitemmb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-custemer-add',
  templateUrl: './custemer-add.component.html',
  styleUrls: ['./custemer-add.component.css']
})
export class CustemerAddComponent implements OnInit {

  @Input() custemeradds: any;
  custemerregForm: FormGroup | any;
  custemerregFormArray: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;
  slNo: number | any;
  custemerSlno: number | any;
  custemername: string = "";
  prodescrip: string = "";
  qunty: string = "";
  uom: string = "";
  unitrate: string = "";
  unitamount?: number | any;
  totalamount: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  salesitem001mbs: Salesitem001mb[] = [];
  salesitem001mb?: Salesitem001mb;
  custemer001wbs: Custemer001wb[] = [];
  custemer001wb?: Custemer001wb;
  // orderItems: Orderitem001mb[] = [];
  arrayslno: any = [];


  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private salesMasterManager: SalesMasterManager,
    private custemerAddManager: CustemerAddManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    if (this.custemeradds && this.custemeradds.length > 0) {
      this.custemerregForm = this.formBuilder.group({
        custemerregFormArray: this.formBuilder.array([]),
      });
      for (let custemeradd of this.custemeradds) {
        this.custemerregFormArray = this.f['custemerregFormArray'] as FormArray;
        this.custemerregFormArray.push(this.createItem(custemeradd));
      }
    } else {
      this.custemerregForm = this.formBuilder.group({
        custemerregFormArray: this.formBuilder.array([this.createItem(new Custemer001wb())]),
      });
    }

    this.salesMasterManager.allproduct().subscribe(response => {
      console.log("response",response);
      
      this.salesitem001mbs = deserialize<Salesitem001mb[]>(Salesitem001mb, response);
    });

    this.loadData();
  }


  loadData() {
    this.custemerAddManager.allcustemer().subscribe(response => {
      this.custemer001wbs = deserialize<Custemer001wb[]>(Custemer001wb, response);
      if (this.custemer001wbs.length > 0) {
        this.gridOptions?.api?.setRowData(this.custemer001wbs);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }


  get f() { return this.custemerregForm.controls; }
  get o() { return this.f.custemerregFormArray as FormArray; }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }


  createItem(custemeradd: Custemer001wb) {
    return this.formBuilder.group({
      custemerSlno: [custemeradd.custemerSlno ? custemeradd.custemerSlno : null, Validators.required],
      custemername: [custemeradd.custemername ? custemeradd.custemername : null, Validators.required],
      prodescrip: [custemeradd.prodescrip ? custemeradd.prodescrip : null, Validators.required],
      qunty: [custemeradd.qunty ? custemeradd.qunty : null, Validators.required],
      uom: [custemeradd.uom ? custemeradd.uom : null, Validators.required],
      unitrate: [custemeradd.unitrate ? custemeradd.unitrate : null, Validators.required],
      totalamount: [custemeradd.totalamount ? custemeradd.totalamount : null, Validators.required],
    })
  }

  addItem() {
    this.custemerregFormArray = this.f['custemerregFormArray'] as FormArray;
    let status: boolean = false;
    for(let control of this.custemerregFormArray.controls) {
      if(control.status == 'INVALID'){
        this.calloutService.showError("An input field is missing!");
        status = true;
        break;
      }
    }
    if(status) {
      return;
    }
    this.custemerregFormArray.push(this.createItem(new Custemer001wb()));
  }


  removeItem(idx: number): void {
    (this.f['custemerregFormArray'] as FormArray).removeAt(idx);
  }

  onOkClick(event: any, custemerregForm: any) {
    let salesitem001mbs: Custemer001wb[] = [];
    for (let i = 0; i < this.custemerregFormArray.controls.length; i++) {
      let custemer001wb = new Custemer001wb();
      custemer001wb.custemerSlno = this.f.custemerregFormArray.value[i].custemerSlno ? this.f.custemerregFormArray.value[i].custemerSlno : "";
      custemer001wb.custemername = this.f.custemerregFormArray.value[i].custemername ? this.f.custemerregFormArray.value[i].custemername : "";
      custemer001wb.prodescrip = this.f.custemerregFormArray.value[i].prodescrip ? this.f.custemerregFormArray.value[i].prodescrip : "";
      custemer001wb.qunty = this.f.custemerregFormArray.value[i].qunty ? this.f.custemerregFormArray.value[i].qunty : "";
      custemer001wb.totalamount = this.f.custemerregFormArray.value[i].totalamount ? this.f.custemerregFormArray.value[i].totalamount : "";
      custemer001wb.uom = this.f.custemerregFormArray.value[i].uom ? this.f.custemerregFormArray.value[i].uom : "";
      custemer001wb.unitrate = this.f.custemerregFormArray.value[i].unitrate ? this.f.custemerregFormArray.value[i].unitrate : "";
      salesitem001mbs.push(custemer001wb)
      this.activeModal.close({
        status: "Yes",
        custemeradds: salesitem001mbs,
      });

    }

  }




  onChange(event: any, index: any) {
    for (let i = 0; i < this.arrayslno.length; i++) {
      if (this.arrayslno[i] == event.target.value) {
        this.calloutService.showWarning("Already selected");
        event.target.value = "";
        break;
      }
    }
    this.arrayslno.push(event.target.value);
    this.salesMasterManager.findOne(event.target.value).subscribe(response => {
      console.log("response",response);
      
      this.salesitem001mb = deserialize<Salesitem001mb>(Salesitem001mb, response);
      this.custemerregFormArray = this.f['custemerregFormArray'] as FormArray;
      this.custemerregFormArray.controls[index].controls['custemername'].setValue(this.salesitem001mb.proname);
      this.custemerregFormArray.controls[index].controls['prodescrip'].setValue(this.salesitem001mb.prodescrip);
      this.custemerregFormArray.controls[index].controls['uom'].setValue(this.salesitem001mb.prouom);
      this.custemerregFormArray.controls[index].controls['unitrate'].setValue(this.salesitem001mb.prounitamount);
      this.custemerregFormArray.controls[index].controls['qunty'].setValue("");
      this.custemerregFormArray.controls[index].controls['totalamount'].setValue("");

    });
  }

  onChangeQty(event: any, index: any) {
    this.custemerregFormArray = this.f['custemerregFormArray'] as FormArray;
    let totalamount = event.target.value * this.salesitem001mb?.prounitamount;
    this.custemerregFormArray.controls[index].controls['totalamount'].setValue(totalamount);
  }



  onReset() {
    this.submitted = false;
    this.custemerregForm.reset();
  }
  onCancelClick() {
    this.activeModal.close('No');
  }

}




