import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { OrderService } from 'src/app/services/order.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-branch-order-list',
  templateUrl: './branch-order-list.component.html',
  styleUrls: ['./branch-order-list.component.css']
})
export class BranchOrderListComponent implements OnInit {
  message : string = "Loading..."
  orders : any[] = []
  constructor(private orderService : OrderService, private signalRService : SignalrService, private hardwareStoreUserService : HardwareStoreUserService, private accountService : AccountService) { }

  ngOnInit(): void {
    this.signalRService.createConnection();
    this.loadOrders()
    
    if(this.getUserRole() == 'StoreAdmin'){
      this.getNewOrder()
    }
  }

  getUserRole() : string {
    return this.accountService.getUserRole()
  }
  loadOrders() : void {
    this.orderService.getAllOrders()
      .subscribe((data) => {
        this.orders = data
        this.message = this.orders.length == 0 && this.getUserRole() == "StoreAdmin" ? "No orders found" : "No orders to be deliver."
        console.log(this.orders)
      })
  }
  getNewOrder() : void {
    this.hardwareStoreUserService.getStoreAdminInfo()
      .subscribe((data) => {
        const branchId = Number(data.branchId);
        this.signalRService.hubConnectionInstance()
          .on('RecieveOrder', (data : any) => {
            console.log(data)
            if(branchId === Number(data.branchId)){
              const order : any = {
                orderId : data.id,
                customerName : data.customerName,
                status : data.status,
                deliver : data.deliver,
                isCustomerOrderRecieved : data.isCustomerOrderRecieved,
                total : data.total,
                orderDate : data.orderDate
              } 
              this.orders.push(order)
              this.orders = this.orders.sort((order1, order2) => {
                if(order1.orderDate < order2.orderDate){
                  return 1
                }else{
                  return -1
                }
              })
            }
          })
      })
  }
  deliverClass(isDeliver : boolean) : string {
    return isDeliver ? 'status-span yes' : 'status-span no'
  }
  orderStatusClass(status : string) : string{ 
    switch(status){
      case "Pending":
        return 'status-span pending';
      case "Cancelled":
        return 'status-span cancelled';
      case 'Completed':
        return 'status-span completed';
      case 'Preparing':
        return 'status-span bg-primary'
      case 'To Deliver':
        return 'status-span bg-dark'
      default:
        return '';
    }
  }
}
