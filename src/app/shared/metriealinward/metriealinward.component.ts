import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { MaterialreceiveditemManager } from '../services/restcontroller/bizservice/Materialreceiveditem.service';
import { OrderItemManager } from '../services/restcontroller/bizservice/orderitem-wb.service';
import { PurchaseorderManager } from '../services/restcontroller/bizservice/Purchaseorder.service';
import { Materialreceiveditem001wb } from '../services/restcontroller/entities/Materialreceiveditem001wb';
import { Orderitem001wb } from '../services/restcontroller/entities/orderitem001wb';
import { Purchaseorder001wb } from '../services/restcontroller/entities/Purchaseorder001wb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';

@Component({
  selector: 'app-metriealinward',
  templateUrl: './metriealinward.component.html',
  styleUrls: ['./metriealinward.component.css']
})
export class MetriealinwardComponent implements OnInit {
  @Input() poNumber: any;
  @Input() materialreceiveditem: any;
  materialForm: FormGroup | any;
  materialFormArray: FormArray | any;
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  submitted = false;
  slNo: number | any;
  orderslno: number | any;
  itemcode: string = "";
  itemname: string = "";
  descrip: string = "";
  qunty: string = "";
  uom: string = "";
  unitrate: string = "";
  unitamount?: number | any;
  totalamount: number | any;
  advisedQty: number | any;
  receivedQty: number | any;
  acceptedQty: number | any;
  rejectedQty: number | any;
  outstanding: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  materialreceiveditem001wbs: Materialreceiveditem001wb[] = [];
  materialreceiveditem001wb?: Materialreceiveditem001wb;
  orderitem001wbs: Orderitem001wb[] = [];
  orderitem001wb?: Orderitem001wb;
  purchaseorder001wbs: Purchaseorder001wb[] = [];
  purchaseorder001wb: Purchaseorder001wb | any;
  purOrders: any = [];
  arrayslno: any = [];
  outstanding1?: number;


  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private calloutService: CalloutService,
    private orderItemManager: OrderItemManager,
    private purchaseorderManager: PurchaseorderManager,
    private materialreceiveditemManager: MaterialreceiveditemManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal,
    private httpClient: HttpClient, private http: HttpClient) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.materialForm = this.formBuilder.group({
      materialFormArray: this.formBuilder.array([this.createItem()])
    });


    this.purchaseorderManager.findOne(this.poNumber).subscribe(response => {
      this.purchaseorder001wb = deserialize<Purchaseorder001wb[]>(Purchaseorder001wb, response);
      for (let i = 0; i < this.purchaseorder001wb.orderitem001wbs.length; i++) {
        if(i<(this.purchaseorder001wb.orderitem001wbs.length)-1){
          this.materialFormArray = this.f['materialFormArray'] as FormArray;
          this.materialFormArray.push(this.createItem());
        }
        this.purOrders.push(this.purchaseorder001wb.orderitem001wbs[i])
        this.materialFormArray.controls[i].controls['itemcode'].setValue(this.purchaseorder001wb.orderitem001wbs[i].orderslno2.itemcode);
        this.materialFormArray.controls[i].controls['itemname'].setValue(this.purchaseorder001wb.orderitem001wbs[i].itemname);
        this.materialFormArray.controls[i].controls['description'].setValue(this.purchaseorder001wb.orderitem001wbs[i].descrip);
        this.materialFormArray.controls[i].controls['uom'].setValue(this.purchaseorder001wb.orderitem001wbs[i].uom);
        this.materialFormArray.controls[i].controls['unitrate'].setValue(this.purchaseorder001wb.orderitem001wbs[i].unitrate);
        this.materialFormArray.controls[i].controls['qunty'].setValue(this.purchaseorder001wb.orderitem001wbs[i].qunty);
        this.materialFormArray.controls[i].controls['totalamount'].setValue(this.purchaseorder001wb.orderitem001wbs[i].totalamount);
      }

    });


    this.orderItemManager.allorder().subscribe(response => {
      this.orderitem001wbs = deserialize<Orderitem001wb[]>(Orderitem001wb, response);

    });
    this.loadData();

  }
  loadData() {
    this.materialreceiveditemManager.allreceiveditem().subscribe(response => {
      this.materialreceiveditem001wbs = deserialize<Materialreceiveditem001wb[]>(Materialreceiveditem001wb, response);
      if (this.materialreceiveditem001wbs.length > 0) {
        this.gridOptions?.api?.setRowData(this.materialreceiveditem001wbs);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }
  get f() { return this.materialForm.controls; }
  get o() { return this.f.materialFormArray as FormArray; }
  createItem() {
    return this.formBuilder.group({
      itemcode: ['', Validators.required],
      itemname: ['', Validators.required],
      description: ['', Validators.required],
      uom: ['', Validators.required],
      unitrate: ['', Validators.required],
      qunty: ['', Validators.required],
      totalamount: ['', Validators.required],
      receivedQty: ['', Validators.required],
      acceptedQty: ['', Validators.required],
      rejectedQty: [''],
      outstanding: [''],
    });
  }

  addItem() {
    this.materialFormArray = this.f['materialFormArray'] as FormArray;
    this.materialFormArray.push(this.createItem());

  }

  removeItem(idx: number): void {
    (this.f['materialFormArray'] as FormArray).removeAt(idx);
  }


  onOkClick(event: any, materialForm: any) {
    let materialreceiveditem001wbs: Materialreceiveditem001wb[] = [];
    for (let i = 0; i < this.materialFormArray.controls.length; i++) {
      let materialreceiveditem001wb = new Materialreceiveditem001wb();
      materialreceiveditem001wb.itemcode = this.f.materialFormArray.value[i].itemcode ? this.f.materialFormArray.value[i].itemcode : "";
      materialreceiveditem001wb.itemname = this.f.materialFormArray.value[i].itemname ? this.f.materialFormArray.value[i].itemname : "";
      materialreceiveditem001wb.qunty = this.f.materialFormArray.value[i].qunty ? this.f.materialFormArray.value[i].qunty : "";
      materialreceiveditem001wb.totalamount = this.f.materialFormArray.value[i].totalamount ? this.f.materialFormArray.value[i].totalamount : "";
      materialreceiveditem001wb.unitrate = this.f.materialFormArray.value[i].unitrate ? this.f.materialFormArray.value[i].unitrate : "";
      materialreceiveditem001wb.receivedQty = this.f.materialFormArray.value[i].receivedQty ? this.f.materialFormArray.value[i].receivedQty : 0;
      materialreceiveditem001wb.acceptedQty = this.f.materialFormArray.value[i].acceptedQty ? this.f.materialFormArray.value[i].acceptedQty : 0;
      materialreceiveditem001wb.rejectedQty = this.f.materialFormArray.value[i].rejectedQty ? this.f.materialFormArray.value[i].rejectedQty : 0;
      materialreceiveditem001wb.outstanding = this.f.materialFormArray.value[i].outstanding ? this.f.materialFormArray.value[i].outstanding : 0;
      materialreceiveditem001wbs.push(materialreceiveditem001wb);
     
      this.activeModal.close({
        status: "Yes",
        materialreceiveditem: materialreceiveditem001wbs,
      });
    

    }
  }

  
  onChange(event: any,) {
    this.outstanding1 = undefined;
    for (let i = 0; i < this.arrayslno.length; i++) {
      if (this.arrayslno[i] == event.target.value) {
        this.calloutService.showWarning("Already selected");
        event.target.value = "";
        break;
      }
    }

    this.arrayslno.push(event.target.value);
    this.orderItemManager.findOne(event.target.value).subscribe(response => {
      this.orderitem001wb = deserialize<Orderitem001wb>(Orderitem001wb, response);
      this.materialForm.patchValue({
        'advisedQty': this.orderitem001wb.qunty,
        'rejectedQty': '',
        'outstanding': '',
        'receivedQty': '',
        'acceptedQty': ''

      })
    });
  }

  onBlurEvent(event: any, index: any) {
   
    if(this.f.materialFormArray.value[index].qunty <= this.f.materialFormArray.value[index].receivedQty){
       
   console.log("event===>",event);
   if (this.f.materialFormArray.value[index].receivedQty && this.f.materialFormArray.value[index].acceptedQty && this.f.materialFormArray.value[index].qunty) {
    let qunty : number = this.f.materialFormArray.value[index].qunty ? this.f.materialFormArray.value[index].qunty : 0;
   let receivedQty : number = this.f.materialFormArray.value[index].receivedQty ? this.f.materialFormArray.value[index].receivedQty : 0;
   let acceptedQty  : number = this.f.materialFormArray.value[index].acceptedQty ? this.f.materialFormArray.value[index].acceptedQty : 0;
   let rejectedQty = receivedQty - acceptedQty;
   console.log("rejectedQty",rejectedQty );
   
   let outstanding = qunty - receivedQty;
   let outstanding1 = outstanding + rejectedQty
   this.materialFormArray.controls[index].controls['rejectedQty'].setValue(rejectedQty);
   this.materialFormArray.controls[index].controls['outstanding'].setValue(outstanding1);

   }
   
  }else{
    this.calloutService.showError("Received Quantity is excess Than ordered Quantity");
  }
 
    
  }

  onCancelClick() {
    this.activeModal.close('No');
  }

}




