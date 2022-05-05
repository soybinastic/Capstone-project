import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { ProductStorageService } from 'src/app/services/product-storage.service';
import { WarehouseProductStatusReportService } from 'src/app/services/warehouse-product-status-report.service';

@Component({
  selector: 'app-wh-add-product-stats-report',
  templateUrl: './wh-add-product-stats-report.component.html',
  styleUrls: ['./wh-add-product-stats-report.component.css']
})
export class WhAddProductStatsReportComponent implements OnInit {

  productsInList : ProductInList[] = [];
  form : FormGroup 
  isValid : boolean = true
  errorMessage : string = '' 
  products : any[] = [] 
  productName : any[] = []
  constructor(private fb : FormBuilder, private warehouseProductStatusReportService : WarehouseProductStatusReportService, private hardwareStoreUserService : HardwareStoreUserService, 
    private productStorageService : ProductStorageService) {
    this.form = fb.group({
      commentary : [''],
      description : [''],
      statusType : ['', Validators.required],
      productId : ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.loadWarehouseAdminInfo()
  }
  isValidInput() : boolean{
    return this.form.valid;
  } 
  loadWarehouseAdminInfo(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
    .subscribe((data) => {
      console.log(data)
      this.loadProducts(data.warehouseId);
    })
  } 
  loadProducts(warehouseId : number){
    this.productStorageService.getProducts(warehouseId)
    .subscribe((data) => {
      this.products = data
      console.log(this.products)
    })
  }
  addToList(){
    this.isValid =true
    this.errorMessage = ''
    if(this.isValidInput()){
      // const data = JSON.stringify(this.form.value)
      // this.productsInList.push(this.form.value)
      this.productsInList.push(this.setValue()) 
      const product = this.products.find(p => p.hardwareProductId == this.setValue().hardwareProductId)
      this.productName.push(product.hardwareProduct.name)
      console.log(this.productsInList) 
      this.clearInputs()
    }else{
      this.isValid = false
      this.errorMessage = 'Invalid Input.'
    }
  }
  sendReport(){
    this.isValid = true;
    const statusReport = {
      reportDetail : {
        description : this.form.controls['commentary'].value,
        reportType : 'ProductStatusReport'
      },
      productStatusReports : this.productsInList
    }  
    const data = JSON.stringify(statusReport)
    console.log(data)
    this.onAddReport(data)
  } 
  
  onAddReport(data : any){
    this.warehouseProductStatusReportService.addReport(data)
    .subscribe((res) => {
      if(res.success == 1){
        console.log(data) 
        this.form.controls['commentary'].setValue('')
        this.productsInList = [] 
        alert(res.message)
      }
    }, (err) => {
      alert(err)
    })
  }
  setValue() : ProductInList{
    const product : ProductInList = {
      description : this.form.controls['description'].value,
      statusType : this.form.controls['statusType'].value,
      hardwareProductId : this.form.controls['productId'].value
    }
    return product
  }
  remove(index : number){
    //this.productsInList.splice(index, 1)
    this.productsInList = this.productsInList.filter((val,i)=>i !== index);
  } 

  setOnInput(productInList : any = {}){
    this.form.controls['statusType'].setValue(productInList.statusType)
    this.form.controls['productId'].setValue(productInList.productId)
  } 
  clearInputs(){
    this.form.controls['description'].setValue('')
    this.form.controls['statusType'].setValue('')
    this.form.controls['productId'].setValue('')
  }
} 

export interface ProductInList{
  description : string 
  statusType : string
  hardwareProductId : string
}
