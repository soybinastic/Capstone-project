import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AdjustCartItemQuantity } from 'src/app/models/cart-model/addjustQuantityInCart';
import { ICart } from 'src/app/models/cart-model/cart';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-in-cart',
  templateUrl: './product-in-cart.component.html',
  styleUrls: ['./product-in-cart.component.css']
})
export class ProductInCartComponent implements OnInit {

  product : any = {}
  previousCartItemQuantity : number
  adjustedQuantity : number
  showButton : boolean = true

  @Input() productInCart : ICart
  @Output() incrementEvent : EventEmitter<ICart> = new EventEmitter()
  @Output() decrementEvent : EventEmitter<ICart> = new EventEmitter()
  @Output() removeEvent : EventEmitter<ICart> = new EventEmitter()
  @Output() adjustQuantityEvent : EventEmitter<AdjustCartItemQuantity> = new EventEmitter();
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getHardwareProduct(this.productInCart.branchId, this.productInCart.productId)
    .subscribe((data)=>{
      this.product = data;
    }) 
    this.previousCartItemQuantity = this.productInCart.productQuantity;
  } 
  increment(productInCart : ICart){
    if(this.product.stockNumber > 0){
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
  onAdjust(event : any){ 
    this.showButton = false
    this.adjustedQuantity = Number(event.target.value)
  } 

  // TODO : fix adjust quantity function.
  onClickAdjust() : void { 
    this.showButton = true;

    

    if(this.adjustedQuantity < 1){
      window.location.reload()
      alert('The quantity mus be greater than zero.')
      return;
      //this.productInCart = this.productInCart
    }

    if(this.adjustedQuantity > 0){

      if(this.adjustedQuantity > this.productInCart.productQuantity){
        const difference = this.adjustedQuantity - this.productInCart.productQuantity;
        const productStockNumber = this.product.stockNumber - difference;
        this.product.stockNumber = productStockNumber

        if((productStockNumber 
          + this.productInCart.productQuantity + difference) < this.adjustedQuantity){
            window.location.reload()
            alert('The maximum of quantity is ' + (productStockNumber 
            + this.productInCart.productQuantity + difference))
            console.log('invalid')
            this.product.stockNumber += difference;
            return;
        }
        console.log('Stock number :' + productStockNumber)
        console.log('Diff : ' + difference)
        console.log('Previous quantity : ' + this.productInCart.productQuantity)
        this.previousCartItemQuantity = this.productInCart.productQuantity
        this.productInCart.productQuantity = this.adjustedQuantity;
        console.log('Quanity adjusted : ' + this.productInCart.productQuantity)
        //this.adjustQuantityEvent.emit(this.productInCart)
        console.log('Validated')
      }else if(this.adjustedQuantity < this.productInCart.productQuantity){
        const difference = this.productInCart.productQuantity - this.adjustedQuantity;
        const productStockNumber = this.product.stockNumber + difference;
        this.product.stockNumber = productStockNumber; 
        this.previousCartItemQuantity = this.productInCart.productQuantity
        this.productInCart.productQuantity = this.adjustedQuantity;
        console.log('Adjusted quantity in lt quantity : ' + this.productInCart.productQuantity)
      } 

      console.log(this.previousCartItemQuantity)
      //this.previousCartItemQuantity = this.productInCart.productQuantity
      const adjustedItem = new AdjustCartItemQuantity()
      adjustedItem.cart = this.productInCart
      adjustedItem.previousCartItemQuantity = this.previousCartItemQuantity
      adjustedItem.adjustedCartItemQuantity = this.adjustedQuantity

      console.log('PREV QTY : ' + this.previousCartItemQuantity)
      this.adjustQuantityEvent.emit(adjustedItem)
      
    }
     
    
  }
}
