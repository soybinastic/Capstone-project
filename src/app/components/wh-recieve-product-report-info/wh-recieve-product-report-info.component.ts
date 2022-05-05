import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { ProductStorageService } from 'src/app/services/product-storage.service';
import { RecieveProductService } from 'src/app/services/recieve-product.service';

@Component({
  selector: 'app-wh-recieve-product-report-info',
  templateUrl: './wh-recieve-product-report-info.component.html',
  styleUrls: ['./wh-recieve-product-report-info.component.css']
})
export class WhRecieveProductReportInfoComponent implements OnInit{
  isInserting : boolean = false
  isGetting : boolean = false  
  displayForm : boolean
  form : FormGroup 
  displayProductName : string = ''
  isValid : boolean = true
  errorMessage : string = '' 
  recieveProducts : any[] = []
  recieveProduct : any = {}
  reportDetails : any = {}
  products : any[] = []
  warehouseReportId : number
  constructor(private fb : FormBuilder, private accountService : AccountService, private recieveProductService : RecieveProductService,private productStorageService : ProductStorageService, private hardwareStoreUserService : HardwareStoreUserService, private urlParam : ActivatedRoute) { 
    this.form = fb.group({
      productId : ['',Validators.required],
      costPrice : ['',Validators.required],
      quantity : ['',Validators.required],
      totalCostPrice : ['']
    }) 
    this.form.controls['totalCostPrice'].disable()
  }

  ngOnInit(): void {
    this.warehouseReportId  = Number(this.urlParam.snapshot.paramMap.get('warehouseReportId'))

    if(this.getRole() == 'WarehouseAdmin'){
      this.warehouseAdminInfo();
    }
    
    this.loadRecieveProducts(this.warehouseReportId) 
    this.loadReportDetails(this.warehouseReportId) 
    
  }
  getRecieveProduct(recieveProductId : number){
    this.recieveProductService.getRecieveProduct(recieveProductId)
    .subscribe((data) => {
      this.recieveProduct = data 
      this.setData(this.recieveProduct)
      console.log(this.recieveProduct)
    })
  }
  loadProducts(warehouseId : number){
    this.productStorageService.getProducts(warehouseId)
    .subscribe((data) => {
      this.products = data
      console.log(this.products)
    })
  } 
  warehouseAdminInfo(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
    .subscribe((data) => {
      this.loadProducts(Number(data.warehouseId))
    })
  }
  clear(){
    this.form.controls['productId'].setValue('')
    this.form.controls['costPrice'].setValue('')
    this.form.controls['quantity'].setValue('')
  } 
  loadRecieveProducts(warehouseReportId : number){
    this.recieveProductService.getRecieveProducts(warehouseReportId)
    .subscribe((data) => {
      this.recieveProducts = data
      console.log(this.recieveProducts)
    })
  }
  loadReportDetails(warehouseReportId : number){
    this.recieveProductService.getReport(warehouseReportId)
    .subscribe((data) => {
      if(this.getRole() == 'StoreOwner' || this.getRole() == 'SuperAdmin'){
        this.loadProducts(Number(data.warehouseId))
      }

      this.reportDetails = data
      console.log(this.reportDetails)
    })
  }
  getRole() : string{
    return this.accountService.getUserRole();
  }
  detailClick(recieveProductId : number){ 

    this.form.controls['productId'].disable()
    // this.selectedProduct('Product 1')
    // this.setData({})
    this.getRecieveProduct(recieveProductId)
    this.isGetting = true;
    this.displayForm = true
    if(this.isInserting){
      this.isInserting = false;
    }
    //alert(recieveProductId)
  } 
  selectedProduct(event : any){
    const hardwareProductId : number = Number(event.target.value)
    const product : any = this.products.find(p => p.hardwareProductId == hardwareProductId)
    this.form.controls['costPrice'].setValue(product.hardwareProduct.costPrice)
  }
  setData(data : any){
    this.form.controls['productId'].setValue(data.hardwareProductId)
    this.form.controls['costPrice'].setValue(data.costPrice)
    this.form.controls['quantity'].setValue(data.quantity)
    this.form.controls['totalCostPrice'].setValue(data.totalCost)
  } 
  onUpdate(){
    this.isValid = true
    if(this.isValidInput()){
      const data : any = {
        hardwareProductId : this.form.controls['productId'].value,
        costPrice : this.form.controls['costPrice'].value,
        quantity : this.form.controls['quantity'].value
      } 

      console.log(JSON.stringify(data))
      console.log(this.recieveProduct.id)
      this.update(JSON.stringify(data), this.recieveProduct.id)
    }else{
      this.isValid = false
      this.errorMessage = 'Invalid Input'
    }
  }
  update(data : any, recieveProductId : number){
    this.recieveProductService.update(data, recieveProductId)
    .subscribe((res) => {
      if(res.success == 1){
        alert(res.message)
        this.loadRecieveProducts(this.warehouseReportId)
        this.onToggle()
      }
    }, (err) => {
      alert('Something went wrong.')
      this.getRecieveProduct(recieveProductId)
    })
  } 
  onAdd(){
    this.isValid = true
    if(this.isValidInput()){
      const data : any = {
        hardwareProductId : this.form.controls['productId'].value,
        costPrice : this.form.controls['costPrice'].value,
        quantity : this.form.controls['quantity'].value
      } 
      console.log(data)
      this.addRecieveProduct(JSON.stringify(data))
    }else{
      this.isValid = false
      this.errorMessage = 'Invalid Input'
    }
  }
  addRecieveProduct(data : any){
    this.recieveProductService.addRecieveProduct(data, this.warehouseReportId)
    .subscribe((res) => {
      if(res.success == 1){
        alert(res.message)
        this.loadRecieveProducts(this.warehouseReportId)
        this.onToggle()
      }
    }, (err) => {
      alert('Something went wrong.')
    })
  }
  isValidInput() : boolean{
    return this.form.valid
  }
  onToggle(){
    
    if(this.isGetting){
      this.isGetting = false
      this.isInserting = false
      this.displayForm = false
    } else{
      this.form.controls['productId'].enable()
      this.clear()
      //this.displayProductName = ''
      if(!this.isInserting){
        this.isInserting = !this.isInserting;
        this.displayForm = !this.displayForm
      //alert('inserting ' + this.isInserting)
      }else{
        this.isInserting = false
        this.displayForm = false
      }
    } 
    
    //alert(this.displayForm)
  }
}
