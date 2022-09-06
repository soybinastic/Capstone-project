import { Component, OnInit } from '@angular/core';
import { IHardwareStore } from 'src/app/models/hardware-store-models/hardwarestore';
import { DashboardService } from 'src/app/services/dashboard.service';
import { HardwareStoreService } from 'src/app/services/hardware-store.service';

@Component({
  selector: 'app-list-stores-in-main-admin',
  templateUrl: './list-stores-in-main-admin.component.html',
  styleUrls: ['./list-stores-in-main-admin.component.css']
})
export class ListStoresInMainAdminComponent implements OnInit {

  stores: IHardwareStore[] = [];
  length: number = 0
  dashboards : any[] = []
  private readonly _dashboardService : DashboardService;
  constructor(private hardwareService : HardwareStoreService, private dashboardService : DashboardService) {
    this._dashboardService = dashboardService;
   }

  ngOnInit(): void { 
    this.hardwareService.getAllHardwareStores()
    .subscribe((data)=>{
      this.stores = data;
      console.log(this.stores)
    }) 
    
    this.loadDashboards();
  }

  loadDashboards() : void{
    this._dashboardService.getAll()
      .subscribe((data) => {
        this.dashboards = data;
        console.log(this.dashboards)
      })
  }

  checkStatus(dashboard : any) : string{
    const status = dashboard.status;
    switch(status){
      case "PAID":
        return "badge badge-pill badge-success";
      case "ONGOING":
        return "badge badge-pill badge-info";
      case "UNPAID":
        return "badge badge-pill badge-danger";
      default:
        return ""
    }
  }

  getTotal(dashboard : any) : number{
    const salesOfMonth : number = Number(dashboard.salesOfMonth);
    return salesOfMonth > 5000 ? (Number(dashboard.profit) + Number(dashboard.platformFee)) : Number(dashboard.profit);
  }

}
