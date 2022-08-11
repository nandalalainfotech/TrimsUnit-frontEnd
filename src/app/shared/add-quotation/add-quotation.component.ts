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
import { PurchasereqslipManager } from '../services/restcontroller/bizservice/Purchasereqslip.service';
import { SupplierQuotationItemManager } from '../services/restcontroller/bizservice/SupplierQuotationitem.service';
import { ChildPart001mb } from '../services/restcontroller/entities/ChildPart001mb';
import { Consumble001mb } from '../services/restcontroller/entities/Consumble001mb';
import { Orderitem001mb } from '../services/restcontroller/entities/Orderitem001mb';
import { Part001mb } from '../services/restcontroller/entities/Part001mb';
import { Purchasereqitem001wb } from '../services/restcontroller/entities/purchasereqitems001wb';
import { Purchasereqslip001wb } from '../services/restcontroller/entities/Purchasereqslip001wb';
import { Supplierquotationitems001wb } from '../services/restcontroller/entities/Supplierquotationitems001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrls: ['./add-quotation.component.css']
})
export class AddQuotationComponent implements OnInit {
  @Input() supplierItems: any;
  @Input() prsNumber: any;

  supplierQuotationForm: FormGroup | any;
  supplierQuotationFormArray: FormArray | any;


  slNo?: number;
  itemcode?: number;
  itemname?: string;
  descrip?: string;
  qunty?: string;
  uom?: string;
  hsn?: string | null;;
  unitrate?: string;
  totalamount?: number;
  cucode?: number;
  cuname?: string;
  cudescrip?: string;
  cuqunty?: string;
  cuom?: string;
  chsn?: string | null;
  cunitrate?: string;
  cutotalamount?: number;
  cptcode?: number;
  cptname?: string;
  cptdescrip?: string;
  cptqunty?: string;
  cptuom?: string;
  cpthsn?: string | null;;
  cptunitrate?: string;
  cpttotalamount?: number;
  prtcode?: number;
  prtmname?: string;
  prtdescrip?: string;
  prtqunty?: string;
  prtuom?: string;
  prthsn?: string ;
  prtunitrate?: string;
  prttotalamount?: number;
  insertUser?: string;
  insertDatetime?: Date;
  updatedUser?: string | null;
  updatedDatetime?: Date | null;
  orderitemSlno: any;
  supplierquotationitems001wbs: Supplierquotationitems001wb[] = [];
  supplierquotationitems001wb?: Supplierquotationitems001wb;
  orderitem001mbs: Orderitem001mb[] = [];
  orderitem001mb?: Orderitem001mb;
  consumble001mbs: Consumble001mb[] = [];
  consumble001mb?: Consumble001mb;
  part001mbs: Part001mb[] = [];
  part001mb?: Part001mb;
  childPart001mbs: ChildPart001mb[] = [];
  childPart001mb?: ChildPart001mb;
  purchasereqslip001wbs: Purchasereqslip001wb[] = [];
  purchasereqslip001wb: Purchasereqslip001wb | any;
  purchasereqitem001wbs: Purchasereqitem001wb[] = [];
  purchasereqitem001wb?: Purchasereqitem001wb;
  // purchasereqslip001wb?: Purchasereqslip001wb;

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private supplierQuotationItemManager: SupplierQuotationItemManager,
    private orderItemSettingManager: OrderItemSettingManager,
    private consumbleManager: ConsumbleManager,
    private childPartManager: ChildPartManager,
    private partManager: PartManager,
    private purchaseregslipManager: PurchasereqslipManager,
    private purchasereqItemManager: PurchasereqItemManager,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit() {
    this.supplierQuotationForm = this.formBuilder.group({
      supplierQuotationFormArray: this.formBuilder.array([this.createItem()])
    });

    this.supplierQuotationItemManager.allsupplierItem().subscribe(response => {
      this.supplierquotationitems001wbs = deserialize<Supplierquotationitems001wb[]>(Supplierquotationitems001wb, response);

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


    this.purchaseregslipManager.findOne(this.prsNumber).subscribe(response => {
      this.purchasereqslip001wb = deserialize<Purchasereqslip001wb[]>(Purchasereqslip001wb, response);
      for (let i = 0; i < this.purchasereqslip001wb.purchasereqitem001wbs.length; i++) {
        if (i < (this.purchasereqslip001wb.purchasereqitem001wbs.length) - 1) {
          this.supplierQuotationFormArray = this.f['supplierQuotationFormArray'] as FormArray;
          this.supplierQuotationFormArray.push(this.createItem());
        }


        this.supplierQuotationFormArray.controls[i].controls['itemcode'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].orderslno);
        this.supplierQuotationFormArray.controls[i].controls['itemname'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].itemname);
        this.supplierQuotationFormArray.controls[i].controls['descrip'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].descrip);
        this.supplierQuotationFormArray.controls[i].controls['uom'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].uom);
        this.supplierQuotationFormArray.controls[i].controls['unitrate'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].unitrate);
        this.supplierQuotationFormArray.controls[i].controls['qunty'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].qunty);
        this.supplierQuotationFormArray.controls[i].controls['totalamount'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].totalamount);
        this.supplierQuotationFormArray.controls[i].controls['hsn'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].hsn);

        this.supplierQuotationFormArray.controls[i].controls['cucode'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cucode);
        this.supplierQuotationFormArray.controls[i].controls['cuname'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cuname);
        this.supplierQuotationFormArray.controls[i].controls['cudescrip'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cudescrip);
        this.supplierQuotationFormArray.controls[i].controls['cuom'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cuom);
        this.supplierQuotationFormArray.controls[i].controls['cunitrate'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cunitrate);
        this.supplierQuotationFormArray.controls[i].controls['cuqunty'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cuqunty);
        this.supplierQuotationFormArray.controls[i].controls['cutotalamount'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cutotalamount);
        this.supplierQuotationFormArray.controls[i].controls['chsn'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].chsn);

        this.supplierQuotationFormArray.controls[i].controls['cptcode'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cptcode);
        this.supplierQuotationFormArray.controls[i].controls['cptname'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cptname);
        this.supplierQuotationFormArray.controls[i].controls['cptdescrip'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cptdescrip);
        this.supplierQuotationFormArray.controls[i].controls['cptuom'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cptuom);
        this.supplierQuotationFormArray.controls[i].controls['cptunitrate'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cptunitrate);
        this.supplierQuotationFormArray.controls[i].controls['cptqunty'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cptqunty);
        this.supplierQuotationFormArray.controls[i].controls['cpttotalamount'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cpttotalamount);
        this.supplierQuotationFormArray.controls[i].controls['cpthsn'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].cpthsn);

        this.supplierQuotationFormArray.controls[i].controls['prtcode'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prtcode);
        this.supplierQuotationFormArray.controls[i].controls['prtmname'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prtmname);
        this.supplierQuotationFormArray.controls[i].controls['prtdescrip'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prtdescrip);
        this.supplierQuotationFormArray.controls[i].controls['prtuom'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prtuom);
        this.supplierQuotationFormArray.controls[i].controls['prtunitrate'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prtunitrate);
        this.supplierQuotationFormArray.controls[i].controls['prtqunty'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prtqunty);
        this.supplierQuotationFormArray.controls[i].controls['prttotalamount'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prttotalamount);
        this.supplierQuotationFormArray.controls[i].controls['prthsn'].setValue(this.purchasereqslip001wb.purchasereqitem001wbs[i].prthsn);
      }

    });

  }

  get f() {
    return this.supplierQuotationForm.controls;
  }

  createItem() {
    return this.formBuilder.group({
      itemcode: ['', Validators.required],
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
      prtuom: ['', Validators.required],
      prthsn: ['', Validators.required],
      prtunitrate: ['', Validators.required],
      prttotalamount: ['', Validators.required],
    });
  }

  addItem() {
    this.supplierQuotationFormArray = this.f['supplierQuotationFormArray'] as FormArray;
    this.supplierQuotationFormArray.push(this.createItem());
  }

  removeItem(idx: number): void {
    (this.f['supplierQuotationFormArray'] as FormArray).removeAt(idx);
  }

  onOkClick(event: any, supplierQuotationForm: any) {
console.log("supplierQuotationForm",supplierQuotationForm);

    let supplierquotationitems001wbs: Supplierquotationitems001wb[] = [];
    for (let i = 0; i < this.supplierQuotationForm.controls.supplierQuotationFormArray.controls.length; i++) {

      let supplierquotationitems001wb = new Supplierquotationitems001wb();
      supplierquotationitems001wb.itemcode = this.f.supplierQuotationFormArray.value[i].itemcode ? this.f.supplierQuotationFormArray.value[i].itemcode : 0;
      supplierquotationitems001wb.itemname = this.f.supplierQuotationFormArray.value[i].itemname ? this.f.supplierQuotationFormArray.value[i].itemname : "";
      supplierquotationitems001wb.qunty = this.f.supplierQuotationFormArray.value[i].qunty ? this.f.supplierQuotationFormArray.value[i].qunty : "";
      supplierquotationitems001wb.totalamount = this.f.supplierQuotationFormArray.value[i].totalamount ? this.f.supplierQuotationFormArray.value[i].totalamount : 0;
      supplierquotationitems001wb.unitrate = this.f.supplierQuotationFormArray.value[i].unitrate ? this.f.supplierQuotationFormArray.value[i].unitrate : "";
      supplierquotationitems001wb.descrip = this.f.supplierQuotationFormArray.value[i].descrip ? this.f.supplierQuotationFormArray.value[i].descrip : "";
      supplierquotationitems001wb.uom = this.f.supplierQuotationFormArray.value[i].uom ? this.f.supplierQuotationFormArray.value[i].uom : "";
      supplierquotationitems001wb.hsn = this.f.supplierQuotationFormArray.value[i].hsn ? this.f.supplierQuotationFormArray.value[i].hsn : "";

      supplierquotationitems001wb.cucode = this.f.supplierQuotationFormArray.value[i].cucode ? this.f.supplierQuotationFormArray.value[i].cucode : 0;
      supplierquotationitems001wb.cuname = this.f.supplierQuotationFormArray.value[i].cuname ? this.f.supplierQuotationFormArray.value[i].cuname : "";
      supplierquotationitems001wb.cuqunty = this.f.supplierQuotationFormArray.value[i].cuqunty ? this.f.supplierQuotationFormArray.value[i].cuqunty : "";
      supplierquotationitems001wb.cutotalamount = this.f.supplierQuotationFormArray.value[i].cutotalamount ? this.f.supplierQuotationFormArray.value[i].cutotalamount : 0;
      supplierquotationitems001wb.cunitrate = this.f.supplierQuotationFormArray.value[i].cunitrate ? this.f.supplierQuotationFormArray.value[i].cunitrate : "";
      supplierquotationitems001wb.cudescrip = this.f.supplierQuotationFormArray.value[i].cudescrip ? this.f.supplierQuotationFormArray.value[i].cudescrip : "";
      supplierquotationitems001wb.cuom = this.f.supplierQuotationFormArray.value[i].cuom ? this.f.supplierQuotationFormArray.value[i].cuom : "";
      supplierquotationitems001wb.chsn = this.f.supplierQuotationFormArray.value[i].chsn ? this.f.supplierQuotationFormArray.value[i].chsn : "";

      supplierquotationitems001wb.cptcode = this.f.supplierQuotationFormArray.value[i].cptcode ? this.f.supplierQuotationFormArray.value[i].cptcode : 0;
      supplierquotationitems001wb.cptname = this.f.supplierQuotationFormArray.value[i].cptname ? this.f.supplierQuotationFormArray.value[i].cptname : "";
      supplierquotationitems001wb.cptunitrate = this.f.supplierQuotationFormArray.value[i].cptunitrate ? this.f.supplierQuotationFormArray.value[i].cptunitrate : "";
      supplierquotationitems001wb.cptqunty = this.f.supplierQuotationFormArray.value[i].cptqunty ? this.f.supplierQuotationFormArray.value[i].cptqunty : "";
      supplierquotationitems001wb.cpttotalamount = this.f.supplierQuotationFormArray.value[i].cpttotalamount ? this.f.supplierQuotationFormArray.value[i].cpttotalamount : 0;
      supplierquotationitems001wb.cptdescrip = this.f.supplierQuotationFormArray.value[i].cptdescrip ? this.f.supplierQuotationFormArray.value[i].cptdescrip : "";
      supplierquotationitems001wb.cptuom = this.f.supplierQuotationFormArray.value[i].cptuom ? this.f.supplierQuotationFormArray.value[i].cptuom : "";
      supplierquotationitems001wb.cpthsn = this.f.supplierQuotationFormArray.value[i].cpthsn ? this.f.supplierQuotationFormArray.value[i].cpthsn : "";

      supplierquotationitems001wb.prtcode = this.f.supplierQuotationFormArray.value[i].prtcode ? this.f.supplierQuotationFormArray.value[i].prtcode : 0;
      supplierquotationitems001wb.prtmname = this.f.supplierQuotationFormArray.value[i].prtmname ? this.f.supplierQuotationFormArray.value[i].prtmname : "";
      supplierquotationitems001wb.prtqunty = this.f.supplierQuotationFormArray.value[i].prtqunty ? this.f.supplierQuotationFormArray.value[i].prtqunty : "";
      supplierquotationitems001wb.prttotalamount = this.f.supplierQuotationFormArray.value[i].prttotalamount ? this.f.supplierQuotationFormArray.value[i].prttotalamount : 0;
      supplierquotationitems001wb.prtunitrate = this.f.supplierQuotationFormArray.value[i].prtunitrate ? this.f.supplierQuotationFormArray.value[i].prtunitrate : "";
      supplierquotationitems001wb.prtdescrip = this.f.supplierQuotationFormArray.value[i].prtdescrip ? this.f.supplierQuotationFormArray.value[i].prtdescrip : "";
      supplierquotationitems001wb.prtuom = this.f.supplierQuotationFormArray.value[i].prtuom ? this.f.supplierQuotationFormArray.value[i].prtuom : "";
      supplierquotationitems001wb.prthsn = this.f.supplierQuotationFormArray.value[i].prthsn ? this.f.supplierQuotationFormArray.value[i].prthsn : "";
      supplierquotationitems001wbs.push(supplierquotationitems001wb);
      console.log("purchasereqitem=========>>>", supplierquotationitems001wbs);
      this.activeModal.close({
        status: "Yes",
        supplierItems: supplierquotationitems001wbs,
      });


    }

   
  }

  onBlurEvent(event: any, index: any) {


    console.log("event===>", event);
    if (this.f.supplierQuotationFormArray.value[index].qunty && this.f.supplierQuotationFormArray.value[index].unitrate) {
      let qunty: number = this.f.supplierQuotationFormArray.value[index].qunty ? this.f.supplierQuotationFormArray.value[index].qunty : 0;
      let unitrate: number = this.f.supplierQuotationFormArray.value[index].unitrate ? this.f.supplierQuotationFormArray.value[index].unitrate : 0;
      let totalAmount = qunty * unitrate;
      console.log("rejectedQty", totalAmount);
      this.supplierQuotationFormArray.controls[index].controls['totalamount'].setValue(totalAmount);
      //  this.supplierQuotationFormArray.controls[index].controls['totalAmount'].setValue(totalAmount);

    }
  }

  onBlurEventcu(event: any, index: any){
    if (this.f.supplierQuotationFormArray.value[index].cuqunty && this.f.supplierQuotationFormArray.value[index].cunitrate) {
      let cuqunty: number = this.f.supplierQuotationFormArray.value[index].cuqunty ? this.f.supplierQuotationFormArray.value[index].cuqunty : 0;
      let cunitrate: number = this.f.supplierQuotationFormArray.value[index].cunitrate ? this.f.supplierQuotationFormArray.value[index].cunitrate : 0;
      let totalAmount = cuqunty * cunitrate;
      console.log("rejectedQty", totalAmount);
      this.supplierQuotationFormArray.controls[index].controls['cutotalamount'].setValue(totalAmount);
      //  this.supplierQuotationFormArray.controls[index].controls['totalAmount'].setValue(totalAmount);

    }
  }
  onBlurEventcpt(event: any, index: any){
    if (this.f.supplierQuotationFormArray.value[index].cptqunty && this.f.supplierQuotationFormArray.value[index].cptunitrate) {
      let cptqunty: number = this.f.supplierQuotationFormArray.value[index].cptqunty ? this.f.supplierQuotationFormArray.value[index].cptqunty : 0;
      let cptunitrate: number = this.f.supplierQuotationFormArray.value[index].cptunitrate ? this.f.supplierQuotationFormArray.value[index].cptunitrate : 0;
      let totalAmount = cptqunty * cptunitrate;
      console.log("rejectedQty", totalAmount);
      this.supplierQuotationFormArray.controls[index].controls['cpttotalamount'].setValue(totalAmount);
      //  this.supplierQuotationFormArray.controls[index].controls['totalAmount'].setValue(totalAmount);

    }
  }
  onBlurEventprt(event: any, index: any){
    if (this.f.supplierQuotationFormArray.value[index].prtqunty && this.f.supplierQuotationFormArray.value[index].prtunitrate) {
      let prtqunty: number = this.f.supplierQuotationFormArray.value[index].prtqunty ? this.f.supplierQuotationFormArray.value[index].prtqunty : 0;
      let prtunitrate: number = this.f.supplierQuotationFormArray.value[index].prtunitrate ? this.f.supplierQuotationFormArray.value[index].prtunitrate : 0;
      let totalAmount = prtqunty * prtunitrate;
      console.log("rejectedQty", totalAmount);
      this.supplierQuotationFormArray.controls[index].controls['prttotalamount'].setValue(totalAmount);
      //  this.supplierQuotationFormArray.controls[index].controls['totalAmount'].setValue(totalAmount);

    }
  }

  onCancelClick() {
    this.activeModal.close('No');
  }
}