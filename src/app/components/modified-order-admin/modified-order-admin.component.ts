import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrder } from 'src/app/models/order-models/order';
import { IOrderDetails } from 'src/app/models/order-models/orderdetails';
import { IUpdateOrder } from 'src/app/models/order-models/updateorder';

@Component({
  selector: 'app-modified-order-admin',
  templateUrl: './modified-order-admin.component.html',
  styleUrls: ['./modified-order-admin.component.css']
})
export class ModifiedOrderAdminComponent implements OnInit {
  
  @Output() backEvent = new EventEmitter()
  @Input() orderDetail : IOrderDetails
  @Input() isCustomerOrderRecieved : boolean 
  @Output() orderUpdateEvent : EventEmitter<IUpdateOrder> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  back(){
    this.backEvent.emit()
  }
  check(isChecked: boolean){
    this.isCustomerOrderRecieved = !isChecked
    alert(this.isCustomerOrderRecieved)
  } 
  done(orderId : number){
   const orderUpdate : IUpdateOrder = {
     orderId : orderId,
     isCustomerOrderRecieved : this.isCustomerOrderRecieved
   } 
   this.orderUpdateEvent.emit(orderUpdate)
  }
}
