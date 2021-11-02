import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ICart } from 'src/app/models/cart-model/cart';
import { IProduct } from 'src/app/models/product-models/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-in-cart',
  templateUrl: './product-in-cart.component.html',
  styleUrls: ['./product-in-cart.component.css']
})
export class ProductInCartComponent implements OnInit {

  product : IProduct
  @Input() productInCart : ICart
  @Output() incrementEvent : EventEmitter<ICart> = new EventEmitter()
  @Output() decrementEvent : EventEmitter<ICart> = new EventEmitter()
  @Output() removeEvent : EventEmitter<ICart> = new EventEmitter()
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getProduct(this.productInCart.hardwareStoreId,this.productInCart.productId)
    .subscribe((data)=>{
      this.product = data;
    })
  } 
  increment(productInCart : ICart){
    if(productInCart.productQuantity < this.product.stockNumber){
      //productInCart.productQuantity += 1;
      this.incrementEvent.emit(productInCart);
    }
  }
  decrement(productInCart : ICart){
    if(productInCart.productQuantity > 1){
      //productInCart.productQuantity -= 1;
      this.decrementEvent.emit(productInCart)
    }
  }
  remove(productInCart : ICart){
    this.removeEvent.emit(productInCart)
  }

}
