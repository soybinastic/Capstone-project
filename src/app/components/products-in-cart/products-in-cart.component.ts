import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AdjustCartItemQuantity } from 'src/app/models/cart-model/addjustQuantityInCart';
import { ICart } from 'src/app/models/cart-model/cart';

@Component({
  selector: 'app-products-in-cart',
  templateUrl: './products-in-cart.component.html',
  styleUrls: ['./products-in-cart.component.css']
})
export class ProductsInCartComponent implements OnInit {

  @Input() productsInCart: ICart[] = []
  @Output() incrementEvent : EventEmitter<ICart> = new EventEmitter();
  @Output() decrementEvent : EventEmitter<ICart> = new EventEmitter();
  @Output() removeEvent : EventEmitter<ICart> = new EventEmitter();
  @Output() adjustQuantityEvent : EventEmitter<AdjustCartItemQuantity> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  increment(productInCart : ICart){
    this.incrementEvent.emit(productInCart)
  }
  decrement(productInCart : ICart){
    this.decrementEvent.emit(productInCart)
  }
  remove(productInCart : ICart){
    this.removeEvent.emit(productInCart)
  } 
  adjustQuantity(adjustedItem : AdjustCartItemQuantity){
    this.adjustQuantityEvent.emit(adjustedItem)
  }
}
