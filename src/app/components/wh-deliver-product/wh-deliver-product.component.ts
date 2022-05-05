import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/services/branch.service';
import { DeliverProductService } from 'src/app/services/deliver-product.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { ProductStorageService } from 'src/app/services/product-storage.service';

@Component({
  selector: 'app-wh-deliver-product',
  templateUrl: './wh-deliver-product.component.html',
  styleUrls: ['./wh-deliver-product.component.css']
})
export class WhDeliverProductComponent implements OnInit {

  @Input() hardwareProductId : number
  @Input() branchId : number
  @Input() requestProduct : any = {}
  @Output() onDeliver : EventEmitter<any> = new EventEmitter<any>()
  form : FormGroup

  branches : any[] = []
  product : any = {}
  withUrlParam : boolean
  isValid : boolean = true
  errorMessage : string = '' 
 
  constructor(private fb : FormBuilder, private urlParam : ActivatedRoute, private branchService : BranchService, private hardwareStoreUserService : HardwareStoreUserService, private productStorageService : ProductStorageService, private deliverProductService : DeliverProductService) {
    this.form = fb.group({
      hardwareProductId : ['', Validators.required],
      branchId : ['',Validators.required],
      quantity : ['',Validators.required]
    }) 
    this.form.controls['hardwareProductId'].disable
   }

  ngOnInit(): void {
    const hardwareProductId : number = Number(this.urlParam.snapshot.paramMap.get('productId'))
    this.warehouseAdminInfo()
    if(hardwareProductId > 0){
      this.hardwareProductId = hardwareProductId
      this.withUrlParam = true
      this.loadProductWithUrlParam()
    }else{
      this.withUrlParam = false
      this.loadProductWithoutUrlParam()
    }
  } 
  warehouseAdminInfo(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
      .subscribe((data) => {
        console.log('From deliver product')
        console.log(data)
        this.loadBranches(Number(data.hardwareStoreId))
      })
  }
  loadProductWithUrlParam(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
      .subscribe((data) => {
        this.productLoader(Number(data.warehouseId))
        //this.setDataWithUrlParam(this.product)
      })
  }
  loadProductWithoutUrlParam(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
      .subscribe((data) => {
        this.productLoader(Number(data.warehouseId))
      })
  }
  productLoader(warehouseId : number){
    this.productStorageService.getProduct(warehouseId, this.hardwareProductId)
      .subscribe((data) => {
        this.product = data
        console.log(this.product)
        if(this.withUrlParam){
          this.setDataWithUrlParam(this.product)
        }else{
          this.setDataWihtoutUrlParam()
        }
      })
  }
  loadBranches(hardwareStoreId : number){
    this.branchService.getBranchesByHardwareStoreId(hardwareStoreId)
      .subscribe((data) => {
        this.branches = data
        console.log(this.branches)
      })
  }
  setDataWithUrlParam(data : any){
    this.form.controls['hardwareProductId'].setValue(data.hardwareProductId)
    //this.form.controls['branchId'].setValue(1)
  }
  setDataWihtoutUrlParam(){
    this.form.controls['branchId'].disable()

    this.form.controls['hardwareProductId'].setValue(this.requestProduct.hardwareProductId)
    this.form.controls['branchId'].setValue(this.branchId)
    this.form.controls['quantity'].setValue(this.requestProduct.quantity)
  }

  deliverClick() : void{
    const deliverProduct : any = {
      requestProductId : this.requestProduct.id,
      hardwareProductId : this.form.controls['hardwareProductId'].value,
      branchId : this.form.controls['branchId'].value,
      quantity : this.form.controls['quantity'].value
    }
    this.onDeliver.emit(deliverProduct)
  }
  onSubmit() : void {
    this.isValid = true
    if(this.isValidInput()){
      if(this.withUrlParam){
        //const data = JSON.stringify(this.form.value)
        const deliverProduct : any = {
          requestProductId : 0,
          hardwareProductId : this.form.controls['hardwareProductId'].value,
          branchId : this.form.controls['branchId'].value,
          quantity : this.form.controls['quantity'].value
        }
        this.onDeliverProduct(deliverProduct)
        console.log(deliverProduct)
      }else{
        this.deliverClick()
      }
    }else{
      this.isValid = false;
      this.errorMessage = 'Invalid Input'
    }
  }
  onDeliverProduct(data : any ){
    this.deliverProductService.deliverProduct(data)
      .subscribe((res) =>{
        alert(res.message)
      }, (err) => {
        alert('Something went wrong.')
        this.isValid = false;
        this.errorMessage = 'Something went wrong.'
      })
  }
  isValidInput() : boolean {
    return this.form.valid;
  }
}
