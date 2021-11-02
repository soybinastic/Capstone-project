import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrder } from 'src/app/models/order-models/order';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {
  @Input() orders : IOrder[] = []
  @Output() detailEvent : EventEmitter<number> = new EventEmitter()
  @Output() totalEvent : EventEmitter<number> = new EventEmitter()
  @Output() viewProductsEvent: EventEmitter<number> = new EventEmitter()
  @Output() modifiedEvent : EventEmitter<IOrder> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  detail(orderId: number){
    this.detailEvent.emit(orderId)
  }
  getTotal(total: number){
    this.totalEvent.emit(total)
  } 
  viewProducts(orderId: number){
    this.viewProductsEvent.emit(orderId)
  }
  modified(order: IOrder){
    this.modifiedEvent.emit(order)
  }
}
