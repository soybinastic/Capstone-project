import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { WarehouseProductStatusReportService } from 'src/app/services/warehouse-product-status-report.service';

@Component({
  selector: 'app-wh-product-satatus-report',
  templateUrl: './wh-product-satatus-report.component.html',
  styleUrls: ['./wh-product-satatus-report.component.css']
})
export class WhProductSatatusReportComponent implements OnInit {

  clickAddBtn : boolean ;
  isValid : boolean;
  errorMessage : string = '' 
  headerTitle : string = 'Warehouses Product Status'
  reports : any[] = [] 
  warehouseAdmin : any = {}
  constructor(private warehouseProductStatusReportService : WarehouseProductStatusReportService,
    private accountService : AccountService, private hardwareStoreUserService : HardwareStoreUserService) { }

  ngOnInit(): void {
    this.loadReports()
    if(this.getRole() == 'WarehouseAdmin'){
      this.loadWarehouseAdminInfo()
    }
  }
  getRole() : string{
    return this.accountService.getUserRole();
  }
  loadWarehouseAdminInfo(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
    .subscribe((data) => {
      this.warehouseAdmin = data
      console.log(this.warehouseAdmin)
    })
  }
  loadReports(){
    this.warehouseProductStatusReportService.getReports()
    .subscribe((data) => {
      this.reports = data
      console.log(this.reports)
    })
  }
  add(){
    this.clickAddBtn = !this.clickAddBtn;
    this.headerTitle = this.clickAddBtn ? 'Add Report' : 'Warehouses Product Status'
  } 
  removeReport(warehouseReportId : number){
    let isConfimed = confirm('Are you sure want to delete this report?\nNote : if you delete this report all data inside here will be deletd also!'); 
    if(isConfimed){
      this.onRemoveReport(warehouseReportId)
    }
  } 
  onRemoveReport(warehouseReportId : number){
    this.warehouseProductStatusReportService.removeReport(warehouseReportId)
    .subscribe((res) => {
      alert(res.message)
      this.reports = this.reports.filter(r => r.id != warehouseReportId)
    }, (err) => {
      console.log(err)
    })
  }

}
