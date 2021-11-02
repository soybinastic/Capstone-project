import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/models/product-models/products';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {

  @Input() product : IProduct
  @Output() updateEvent : EventEmitter<IProduct> = new EventEmitter();
  @Output() deleteEvent : EventEmitter<IProduct> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  update(product : IProduct){
    this.updateEvent.emit(product)
  } 
  delete(product: IProduct){
    this.deleteEvent.emit(product)
  }
}
