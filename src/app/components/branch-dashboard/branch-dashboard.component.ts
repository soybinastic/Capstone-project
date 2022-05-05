import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-branch-dashboard',
  templateUrl: './branch-dashboard.component.html',
  styleUrls: ['./branch-dashboard.component.css']
})
export class BranchDashboardComponent implements OnInit {

  todaySales : number
  monthlySales : any = {}
  dateToday : Date = new Date()
  pendingOrders : any[] = []
  constructor(private saleService : SaleService, private orderService : OrderService) { }

  ngOnInit(): void {
    this.getTodaySales()
    this.getMonthlySales()
    this.loadPendingOrders()
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
}
