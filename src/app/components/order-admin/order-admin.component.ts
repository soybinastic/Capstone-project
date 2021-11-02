import { Component, Input, Output,OnInit, EventEmitter } from '@angular/core';
import { IOrder } from 'src/app/models/order-models/order';
import { IOrderDetails } from 'src/app/models/order-models/orderdetails';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit {
  @Input() order : IOrder;
  
  @Output() detailEvent: EventEmitter<number> = new EventEmitter();
  @Output() totalEvent: EventEmitter<number> = new EventEmitter();
  @Output() viewProductsEvent: EventEmitter<number> = new EventEmitter();
  @Output() modifiedEvent: EventEmitter<IOrder> = new EventEmitter(); 
  constructor() { }

  ngOnInit(): void {
  } 
  detail(orderId: number,total: number){
    this.detailEvent.emit(orderId)
    this.totalEvent.emit(total)
  } 
  viewProducts(orderId: number){
    this.viewProductsEvent.emit(orderId)
  }
  modified(order: IOrder){
    this.modifiedEvent.emit(order)
  }
}
