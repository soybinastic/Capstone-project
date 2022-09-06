import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { OrderService } from 'src/app/services/order.service';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-branch-dashboard',
  templateUrl: './branch-dashboard.component.html',
  styleUrls: ['./branch-dashboard.component.css']
})
export class BranchDashboardComponent implements OnInit {
  branchId : number
  dashboards : any[] = []
  todaySales : number
  monthlySales : any = {}
  dateToday : Date = new Date()
  pendingOrders : any[] = []
  constructor(private saleService : SaleService, private orderService : OrderService, 
    private hardwareStoreUserService : HardwareStoreUserService, 
    private dashboardService : DashboardService, 
    private route : Router) { }

  ngOnInit(): void {
    this.getTodaySales()
    this.getMonthlySales()
    this.loadPendingOrders()
    this.loadStoreAdminInfo()
  }

  loadPendingOrders() : void {
    this.orderService.getAllOrders()
      .subscribe((data) => {
        this.pendingOrders = data;
        this.pendingOrders = this.pendingOrders.filter(o => o.status == 'Pending')
      })
  }
  getTodaySales(){
    this.saleService.getTodaySales()
      .subscribe((data) => {
        this.todaySales = Number(data)
        console.log(this.todaySales)
      })
  }
  getMonthlySales() : void {
    const datenow = new Date()
    this.saleService.getMonthlySales(datenow.getFullYear())
      .subscribe((data) => {
        this.monthlySales = data
        console.log(this.monthlySales)
      })
  }

  loadStoreAdminInfo() : void {
    this.hardwareStoreUserService.getStoreAdminInfo()
      .subscribe((data) => {
        //this.loadDashboards(Number(data.branchId));
        this.branchId = Number(data.branchId)
        this.loadToPay(Number(data.branchId));
      })
  }
  loadToPay(branchId : number) : void{
    this.dashboardService.getAll(branchId)
      .subscribe((data) => {
        this.dashboards = data;
        console.log(this.dashboards);
      });
  }
  loadDashboards(branchId : number) : void{
    this.dashboardService.getByBranch(branchId)
      .subscribe((data) => {
        this.dashboards = data;
        console.log(this.dashboards)
      });
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

  onClick(dashboard : any, branchId : number) : void {
    this.route.navigate(['/branch', 'bill-details', dashboard.id], {
      queryParams : {
        bid : branchId,
        prev_url : this.route.url
      }
    })
  }
}
