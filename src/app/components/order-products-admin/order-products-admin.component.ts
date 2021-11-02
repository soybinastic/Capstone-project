import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrderProduct } from 'src/app/models/order-models/orderproducts';

@Component({
  selector: 'app-order-products-admin',
  templateUrl: './order-products-admin.component.html',
  styleUrls: ['./order-products-admin.component.css']
})
export class OrderProductsAdminComponent implements OnInit {

  @Input() orderProducts: IOrderProduct[] = []
  @Output() backEvent  = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  back(){
    this.backEvent.emit()
  }
}
