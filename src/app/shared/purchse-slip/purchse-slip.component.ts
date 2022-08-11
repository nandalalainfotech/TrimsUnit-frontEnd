import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { ChildPartManager } from '../services/restcontroller/bizservice/ChildPart.service';
import { ConsumbleManager } from '../services/restcontroller/bizservice/consumble.service';
import { OrderItemSettingManager } from '../services/restcontroller/bizservice/orderItems.service';
import { PartManager } from '../services/restcontroller/bizservice/part.service';
import { PurchasereqItemManager } from '../services/restcontroller/bizservice/Purchasereqitem.service';
import { ChildPart001mb } from '../services/restcontroller/entities/ChildPart001mb';
import { Consumble001mb } from '../services/restcontroller/entities/Consumble001mb';
import { Orderitem001mb } from '../services/restcontroller/entities/Orderitem001mb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { Purchasereqitem001wb } from '../services/restcontroller/entities/purchasereqitems001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-purchse-slip',
  templateUrl: './purchse-slip.component.html',
  styleUrls: ['./purchse-slip.component.css']
})
export class PurchseSlipComponent implements OnInit {
  @Input() purchasereqitem: any;
  purchasereqForm: FormGroup | any;
  purchasereqFormArry: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  slNo?: number;
  orderslno?: number;
  itemcode?: string;
  itemname?: string;
  descrip?: string;
  qunty?: string;
  uom?: string;
  hsn?: string;
  unitrate?: string;
  totalamount?: number;
  cucode?: number;
  cuname?: string;
  cudescrip?: string;
  cuqunty?: string;
  cuom?: string;
  chsn?: string;
  cunitrate?: string;
  cutotalamount?: number;
  cptcode?: number;
  cptname?: string;
  cptdescrip?: string;
  cptqunty?: string;
  cptuom?: string;
  cpthsn?: string;
  cptunitrate?: string;
  cpttotalamount?: number;
  prtcode?: number;
  prtmname?: string;
  prtdescrip?: string;
  prthsn?: string;
  prtqunty?: string;
  prtuom?: string;
  prtunitrate?: string;
  prttotalamount?: number;
  insertUser?: string;
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;
  orderitemSlno: any;
  purchasereqitem001wbs: Purchasereqitem001wb[] = [];
  purchasereqitem001wb?: Purchasereqitem001wb;
  orderitem001mbs: Orderitem001mb[] = [];
  orderitem001mb?: Orderitem001mb;
  consumble001mbs: Consumble001mb[] = [];
  consumble001mb?: Consumble001mb;
  part001mbs: Part001mb[] = [];
  part001mb?: Part001mb;
  childPart001mbs: ChildPart001mb[] = [];
  childPart001mb?: ChildPart001mb;
  arrayslno: any = [];

  
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private purchasereqItemManager: PurchasereqItemManager,
    private orderItemSettingManager: OrderItemSettingManager,
    private consumbleManager: ConsumbleManager,
    private childPartManager: ChildPartManager,
    private partManager: PartManager,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit() {
   
    this.purchasereqForm = this.formBuilder.group({
      purchasereqFormArry: this.formBuilder.array([this.createItem()])
    });
    console.log("control1223",this.purchasereqFormArry);
    this.purchasereqItemManager.allpurchasereqItem().subscribe(response => {
      this.purchasereqitem001wbs = deserialize<Purchasereqitem001wb[]>(Purchasereqitem001wb, response);

    });

    this.orderItemSettingManager.allitem().subscribe(response => {
      this.orderitem001mbs = deserialize<Orderitem001mb[]>(Orderitem001mb, response);

    });

    this.consumbleManager.allconsumble().subscribe(response => {
      this.consumble001mbs = deserialize<Consumble001mb[]>(Consumble001mb, response);

    });

    this.childPartManager.allChildpart().subscribe(response => {
      this.childPart001mbs = deserialize<ChildPart001mb[]>(ChildPart001mb, response);

    });

    this.partManager.allpart().subscribe(response => {
      this.part001mbs = deserialize<Part001mb[]>(Part001mb, response);

    });

  }

  get f() {
    return this.purchasereqForm.controls;
  }

  createItem() {
    return this.formBuilder.group({
      orderslno: ['', Validators.required],
      itemname: ['', Validators.required],
      descrip: ['', Validators.required],
      qunty: ['', Validators.required],
      uom: ['', Validators.required],
      hsn: ['', Validators.required],
      unitrate: ['', Validators.required],
      totalamount: ['', Validators.required],

      cucode: ['', Validators.required],
      cuname: ['', Validators.required],
      cudescrip: ['', Validators.required],
      cuqunty: ['', Validators.required],
      cuom: ['', Validators.required],
      chsn: ['', Validators.required],
      cunitrate: ['', Validators.required],
      cutotalamount: ['', Validators.required],

      cptcode: ['', Validators.required],
      cptname: ['', Validators.required],
      cptdescrip: ['', Validators.required],
      cptqunty: ['', Validators.required],
      cptuom: ['', Validators.required],
      cpthsn: ['', Validators.required],
      cptunitrate: ['', Validators.required],
      cpttotalamount: ['', Validators.required],

      prtcode: ['', Validators.required],
      prtmname: ['', Validators.required],
      prtdescrip: ['', Validators.required],
      prtqunty: ['', Validators.required],
      prthsn: ['', Validators.required],
      prtuom: ['', Validators.required],
      prtunitrate: ['', Validators.required],
      prttotalamount: ['', Validators.required],
    });
  }

  addItem() {
    // this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    // let status: boolean = false;
    // for(let control of this.purchasereqFormArry.controls) {
     
      
    //   if(control.status == 'INVALID'){
    //     this.calloutService.showError("An input field is missing!");
    //     status = true;
    //     break;
    //   }
    // }
    // if(status) {
    //   return;
    // }
    // console.log("purchasereqFormArry",this.purchasereqFormArry);
    
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    this.purchasereqFormArry.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['purchasereqFormArry'] as FormArray).removeAt(idx);
  }

  onOkClick(event: any, purchasereqForm: any) {
    // console.log("purchasereqForm",purchasereqForm.controls.purchasereqFormArry[0].controls[0].orderslno);
console.log("purchasereqForm",purchasereqForm);

    let purchasereqitem001wbs: Purchasereqitem001wb[] = [];
    for (let i = 0; i < this.purchasereqForm.controls.purchasereqFormArry.controls.length; i++) {

      let purchasereqitem001wb = new Purchasereqitem001wb();
      purchasereqitem001wb.orderslno = this.f.purchasereqFormArry.value[i].orderslno ? this.f.purchasereqFormArry.value[i].orderslno : 0;
      purchasereqitem001wb.itemname = this.f.purchasereqFormArry.value[i].itemname ? this.f.purchasereqFormArry.value[i].itemname : "";
      purchasereqitem001wb.qunty = this.f.purchasereqFormArry.value[i].qunty ? this.f.purchasereqFormArry.value[i].qunty : "";
      purchasereqitem001wb.totalamount = this.f.purchasereqFormArry.value[i].totalamount ? this.f.purchasereqFormArry.value[i].totalamount : 0;
      purchasereqitem001wb.unitrate = this.f.purchasereqFormArry.value[i].unitrate ? this.f.purchasereqFormArry.value[i].unitrate : "";
      purchasereqitem001wb.descrip = this.f.purchasereqFormArry.value[i].descrip ? this.f.purchasereqFormArry.value[i].descrip : "";
      purchasereqitem001wb.uom = this.f.purchasereqFormArry.value[i].uom ? this.f.purchasereqFormArry.value[i].uom : "";
      purchasereqitem001wb.hsn = this.f.purchasereqFormArry.value[i].hsn ? this.f.purchasereqFormArry.value[i].hsn : "";

      purchasereqitem001wb.cucode = this.f.purchasereqFormArry.value[i].cucode ? this.f.purchasereqFormArry.value[i].cucode : 0;
      purchasereqitem001wb.cuname = this.f.purchasereqFormArry.value[i].cuname ? this.f.purchasereqFormArry.value[i].cuname : "";
      purchasereqitem001wb.cuqunty = this.f.purchasereqFormArry.value[i].cuqunty ? this.f.purchasereqFormArry.value[i].cuqunty : "";
      purchasereqitem001wb.cutotalamount = this.f.purchasereqFormArry.value[i].cutotalamount ? this.f.purchasereqFormArry.value[i].cutotalamount : 0;
      purchasereqitem001wb.cunitrate = this.f.purchasereqFormArry.value[i].cunitrate ? this.f.purchasereqFormArry.value[i].cunitrate : "";
      purchasereqitem001wb.cudescrip = this.f.purchasereqFormArry.value[i].cudescrip ? this.f.purchasereqFormArry.value[i].cudescrip : "";
      purchasereqitem001wb.cuom = this.f.purchasereqFormArry.value[i].cuom ? this.f.purchasereqFormArry.value[i].cuom : "";
      purchasereqitem001wb.chsn = this.f.purchasereqFormArry.value[i].chsn ? this.f.purchasereqFormArry.value[i].chsn : "";


      purchasereqitem001wb.cptcode = this.f.purchasereqFormArry.value[i].cptcode ? this.f.purchasereqFormArry.value[i].cptcode : 0;
      purchasereqitem001wb.cptname = this.f.purchasereqFormArry.value[i].cptname ? this.f.purchasereqFormArry.value[i].cptname : "";
      purchasereqitem001wb.cptunitrate = this.f.purchasereqFormArry.value[i].cptunitrate ? this.f.purchasereqFormArry.value[i].cptunitrate : "";
      purchasereqitem001wb.cptqunty = this.f.purchasereqFormArry.value[i].cptqunty ? this.f.purchasereqFormArry.value[i].cptqunty : "";
      purchasereqitem001wb.cpttotalamount = this.f.purchasereqFormArry.value[i].cpttotalamount ? this.f.purchasereqFormArry.value[i].cpttotalamount : 0;
      purchasereqitem001wb.cptdescrip = this.f.purchasereqFormArry.value[i].cptdescrip ? this.f.purchasereqFormArry.value[i].cptdescrip : "";
      purchasereqitem001wb.cptuom = this.f.purchasereqFormArry.value[i].cptuom ? this.f.purchasereqFormArry.value[i].cptuom : "";
      purchasereqitem001wb.cpthsn = this.f.purchasereqFormArry.value[i].cpthsn ? this.f.purchasereqFormArry.value[i].cpthsn : "";

      purchasereqitem001wb.prtcode = this.f.purchasereqFormArry.value[i].prtcode ? this.f.purchasereqFormArry.value[i].prtcode : 0;
      purchasereqitem001wb.prtmname = this.f.purchasereqFormArry.value[i].prtmname ? this.f.purchasereqFormArry.value[i].prtmname : "";
      purchasereqitem001wb.prtqunty = this.f.purchasereqFormArry.value[i].prtqunty ? this.f.purchasereqFormArry.value[i].prtqunty : "";
      purchasereqitem001wb.prttotalamount = this.f.purchasereqFormArry.value[i].prttotalamount ? this.f.purchasereqFormArry.value[i].prttotalamount : 0;
      purchasereqitem001wb.prtunitrate = this.f.purchasereqFormArry.value[i].prtunitrate ? this.f.purchasereqFormArry.value[i].prtunitrate : "";
      purchasereqitem001wb.prtdescrip = this.f.purchasereqFormArry.value[i].prtdescrip ? this.f.purchasereqFormArry.value[i].prtdescrip : "";
      purchasereqitem001wb.prtuom = this.f.purchasereqFormArry.value[i].prtuom ? this.f.purchasereqFormArry.value[i].prtuom : "";
      purchasereqitem001wb.prthsn = this.f.purchasereqFormArry.value[i].prthsn ? this.f.purchasereqFormArry.value[i].prthsn : "";

      purchasereqitem001wbs.push(purchasereqitem001wb);
      console.log("purchasereqitem=========>>>", purchasereqitem001wbs);
      this.activeModal.close({
        status: "Yes",
        purchasereqitem: purchasereqitem001wbs,
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
    this.orderItemSettingManager.findOne(event.target.value).subscribe(response => {
      this.orderitem001mb = deserialize<Orderitem001mb>(Orderitem001mb, response);
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
      this.purchasereqFormArry.controls[index].controls['itemname'].setValue(this.orderitem001mb.itemname);
      this.purchasereqFormArry.controls[index].controls['descrip'].setValue(this.orderitem001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['uom'].setValue(this.orderitem001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['unitrate'].setValue(this.orderitem001mb.unitamount);
      this.purchasereqFormArry.controls[index].controls['hsn'].setValue(this.orderitem001mb.hsn);
      this.purchasereqFormArry.controls[index].controls['qunty'].setValue("");
      this.purchasereqFormArry.controls[index].controls['totalamount'].setValue("");

    });
  }

  onChangeQty(event: any, index: any) {
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    let totalamount = event.target.value * this.orderitem001mb?.unitamount;
    this.purchasereqFormArry.controls[index].controls['totalamount'].setValue(totalamount);
  }

  onChangeConsumables(event: any, index: any){
    for (let i = 0; i < this.arrayslno.length; i++) {
      if (this.arrayslno[i] == event.target.value) {
        this.calloutService.showWarning("Already selected");
        event.target.value = "";
        break;
      }
    }
    this.consumbleManager.findOne(event.target.value).subscribe(response => {
      this.consumble001mb = deserialize<Consumble001mb>(Consumble001mb, response);
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
      this.purchasereqFormArry.controls[index].controls['cuname'].setValue(this.consumble001mb.consname);
      this.purchasereqFormArry.controls[index].controls['cudescrip'].setValue(this.consumble001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['cuom'].setValue(this.consumble001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['cunitrate'].setValue(this.consumble001mb.unitamount);
      this.purchasereqFormArry.controls[index].controls['chsn'].setValue(this.consumble001mb.hsn);
      this.purchasereqFormArry.controls[index].controls['cuqunty'].setValue("");
      this.purchasereqFormArry.controls[index].controls['cutotalamount'].setValue("");

    });

  }

  onChangeConsumableQty(event: any, index: any) {
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    let totalamount = event.target.value * this.consumble001mb?.unitamount;
    this.purchasereqFormArry.controls[index].controls['cutotalamount'].setValue(totalamount);
  }

  onChangeChild(event: any, index: any){
    this.childPartManager.findOne(event.target.value).subscribe(response => {
      this.childPart001mb = deserialize<ChildPart001mb>(ChildPart001mb, response);
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
      this.purchasereqFormArry.controls[index].controls['cptname'].setValue(this.childPart001mb.cpartname);
      this.purchasereqFormArry.controls[index].controls['cptdescrip'].setValue(this.childPart001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['cptuom'].setValue(this.childPart001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['cptunitrate'].setValue(this.childPart001mb.unitamount);
      this.purchasereqFormArry.controls[index].controls['cpthsn'].setValue(this.childPart001mb.hsn);
      this.purchasereqFormArry.controls[index].controls['cptqunty'].setValue("");
      this.purchasereqFormArry.controls[index].controls['cpttotalamount'].setValue("");

    });

   


  }

  onChangeCptQty(event: any, index: any){
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    let totalamount = event.target.value * this.childPart001mb?.unitamount;
    this.purchasereqFormArry.controls[index].controls['cpttotalamount'].setValue(totalamount);
  }

  onChangePart(event: any, index: any){
    this.partManager.findOne(event.target.value).subscribe(response => {
      this.part001mb = deserialize<Part001mb>(Part001mb, response);
      this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
      this.purchasereqFormArry.controls[index].controls['prtmname'].setValue(this.part001mb.partname);
      this.purchasereqFormArry.controls[index].controls['prtdescrip'].setValue(this.part001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['prtuom'].setValue(this.part001mb.descrip);
      this.purchasereqFormArry.controls[index].controls['prtunitrate'].setValue(this.part001mb.unitamount);
      this.purchasereqFormArry.controls[index].controls['prthsn'].setValue(this.part001mb.hsn);
      this.purchasereqFormArry.controls[index].controls['prtqunty'].setValue("");
      this.purchasereqFormArry.controls[index].controls['prttotalamount'].setValue("");

    });
  }

  onChangepartQty(event: any, index: any){
    this.purchasereqFormArry = this.f['purchasereqFormArry'] as FormArray;
    let totalamount = event.target.value * this.part001mb?.unitamount;
    this.purchasereqFormArry.controls[index].controls['prttotalamount'].setValue(totalamount);
  }

  onCancelClick() {
    this.activeModal.close('No');
  }
}