import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICategory } from 'src/app/models/category-models/category';
import { IProduct } from 'src/app/models/product-models/products';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {
  @Input() isClicked : boolean;
  @Input() categories : ICategory[] = []
  @Input() products : IProduct[] = []
  @Input() categoryName : string
  @Output() selectedCategoryEvent : EventEmitter<ICategory> = new EventEmitter()
  @Output() addProductEvent = new EventEmitter()
  @Output() updateEvent : EventEmitter<IProduct> = new EventEmitter()
  @Output() deleteEvent : EventEmitter<IProduct> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  } 
  selected(category : ICategory){
    this.selectedCategoryEvent.emit(category)
  }
  addProduct(){
    this.addProductEvent.emit();
  }
  update(product: IProduct){
    this.updateEvent.emit(product)
  } 
  delete(product: IProduct){
    this.deleteEvent.emit(product)
  }
}
