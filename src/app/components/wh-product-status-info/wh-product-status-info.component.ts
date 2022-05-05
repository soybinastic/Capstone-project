import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { ProductStorageService } from 'src/app/services/product-storage.service';
import { WarehouseProductStatusReportService } from 'src/app/services/warehouse-product-status-report.service';

@Component({
  selector: 'app-wh-product-status-info',
  templateUrl: './wh-product-status-info.component.html',
  styleUrls: ['./wh-product-status-info.component.css']
})
export class WhProductStatusInfoComponent implements OnInit {
  isValid : boolean = true;
  errorMessage: string =''
  isAdding : boolean; 
  warehouseReportId : number 
  productStatusReports : any[] = []
  reportDetails : any = {}
  products : any[] = []

  // warehouseReportOwner value is warehouseId
  warehouseReportOwner : number
  form : FormGroup
  constructor(private fb : FormBuilder, private warehouseProductStatusReportService : WarehouseProductStatusReportService, private productStorgeService : ProductStorageService, private urlParam : ActivatedRoute, private accountService : AccountService, private hardwareStoreUserService : HardwareStoreUserService) {
    this.form = fb.group({
      description : ['',Validators.required],
      hardwareProductId : ['',Validators.required],
      statusType : ['',Validators.required]
    })
   }

  ngOnInit(): void { 
    this.warehouseReportId = Number(this.urlParam.snapshot.paramMap.get('warehouseReportId'));
    this.loadProductStatusReports() 
    this.loadReportDetails()
    if(this.getRole() == 'WarehouseAdmin'){
      this.warehouseAdminInfo()
    }
  } 
  getRole() : string{
    return this.accountService.getUserRole()
  } 
  warehouseAdminInfo(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
    .subscribe((data) => {
      console.log(data)
      this.warehouseReportOwner = Number(data.warehouseId);
      this.loadProducts(Number(data.warehouseId))
    })
  }
  loadProducts(warehouseId : number){
    this.productStorgeService.getProducts(warehouseId)
    .subscribe((data) => {
      this.products = data
      console.log(this.products)
    })
  } 
  loadReportDetails(){
    this.warehouseProductStatusReportService.getReport(this.warehouseReportId)
    .subscribe((data) => {
      console.log('warehouse report details')
      this.reportDetails = data
      console.log(this.reportDetails)
    })
  }
  loadProductStatusReports(){
    this.warehouseProductStatusReportService.getProductStatusReports(this.warehouseReportId)
    .subscribe((data) => {
      this.productStatusReports = data
      // this.reportDetails = this.productStatusReports[0]
      // console.log(this.reportDetails)
      console.log(this.productStatusReports)
    })
  }
  removeStatusReport(productStatusReportId : number){
    let isConfirm = confirm('Are you sure you want to delete this product status report?')
    if(isConfirm){
      this.onRemoveStatusReport(productStatusReportId)
    }
  } 
  onRemoveStatusReport(productStatusReportId : number){
    this.warehouseProductStatusReportService
      .removeStatusReport(productStatusReportId)
      .subscribe((res) => {
        if(res.success == 1){
          alert(res.message)
          this.productStatusReports = this.productStatusReports.filter(r => r.id != productStatusReportId)
        }
      }, (err) => {
        alert('Something went wrong.')
      })
  }
  onToggle(){
    this.isAdding = !this.isAdding
  } 
  onAdd(){
    this.isValid = true
    this.errorMessage = ''
    if(this.isValidInput()){
      const data = JSON.stringify(this.form.value)
      console.log(data)
      console.log('Warehouse Report Id : ' + this.warehouseReportId)
      this.onAddStatusReport(data, this.warehouseReportId)
    }else{
      this.isValid = false;
      this.errorMessage = 'Invalid Input.'
    }

  } 
  onAddStatusReport(data: any, warehouseReportId : number){
    this.warehouseProductStatusReportService.addStatusReport(data, warehouseReportId)
    .subscribe((res) => {
      if(res.success == 1){
        alert(res.message)
        this.loadProductStatusReports()
      }
    }, (err) => {
      this.isValid = false;
      this.errorMessage = 'Something went wrong.'
    })
  }
  isValidInput() : boolean{
    return this.form.valid
  }
}
