import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-branch-order-confirmation',
  templateUrl: './branch-order-confirmation.component.html',
  styleUrls: ['./branch-order-confirmation.component.css']
})
export class BranchOrderConfirmationComponent implements OnInit {

  date : Date = new Date()
  confirmBtnText : string = 'Confirm Order'
  completedOrders : any[] = []
  _confirmBtnDisable : boolean = false;
  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.loadCompletedOrders()
  }

  loadCompletedOrders() : void {
    this.orderService.getCompletedOrders()
      .subscribe((data) => {
        this.completedOrders = data
        console.log(this.completedOrders)
      })
  }

  confirmOrder(orderId : number) : void {
    this.onConfirmOrder(orderId)
    //alert(orderId)
  }

  onConfirmOrder(orderId : number) : void {
    this.confirmBtnText = "Processing..."
    this._confirmBtnDisable = true;
    this.orderService.confirmOrder(orderId)
      .subscribe((res) => {
        alert(res.message)
        const index = this.completedOrders.findIndex(co => co.orderId == orderId)
        this.completedOrders[index].isConfirmed = true
      }, (err) => {
        alert('Something went wrong')
        this.confirmBtnText = "Confirm Order";
        this._confirmBtnDisable = false;
      })
  }
}
