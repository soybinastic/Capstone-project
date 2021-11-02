import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IOrderProduct } from 'src/app/models/order-models/orderproducts';

@Component({
  selector: 'app-order-product-admin',
  templateUrl: './order-product-admin.component.html',
  styleUrls: ['./order-product-admin.component.css']
})
export class OrderProductAdminComponent implements OnInit {

  @Input() orderProduct : IOrderProduct

  constructor() { }

  ngOnInit(): void {
  }
}
