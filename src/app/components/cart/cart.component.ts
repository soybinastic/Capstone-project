import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdjustCartItemQuantity } from 'src/app/models/cart-model/addjustQuantityInCart';
import { ICart } from 'src/app/models/cart-model/cart';
import { CartDetails } from 'src/app/models/cart-model/cartDetails.model';
import { AccountService } from 'src/app/services/account.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  isOpen : boolean;
  // get url params ->
  branchId : number;
  hardwareStoreId : number;
  productId : number;
  fromComponent : any
  //<-
  total : number = 0
  productsInCart : ICart[] = []
  cartDetails : CartDetails
  constructor(private accountService : AccountService, private route : Router, 
    private urlParam : ActivatedRoute, private cartService : CartService) { }

  ngOnInit(): void {
    if(!this.accountService.isLoggedIn()){
      this.route.navigate(['/login'])
      .then(()=> window.location.reload())
    } 

    const hardwareStoreIdParam = this.urlParam.snapshot.paramMap.get('hardwareStoreId')
    const fromComponentParam = this.urlParam.snapshot.paramMap.get('from') 
    const productIdParam = this.urlParam.snapshot.paramMap.get('productId')
    const branchIdParam = this.urlParam.snapshot.paramMap.get('branchId');

    this.branchId = Number(branchIdParam)
    this.hardwareStoreId = Number(hardwareStoreIdParam)
    this.fromComponent = fromComponentParam;
    this.productId = Number(productIdParam)

    const header = document.querySelector('.header') as HTMLDivElement;
    const checkOut = document.querySelector('.check-out') as HTMLDivElement;
    window.addEventListener('scroll', ()=>{
      if(window.scrollY >= 51.25){
        header.classList.add('fix')
      }else{
        header.classList.remove('fix')
      } 
      checkOut.classList.add('check-out-fix')
    }) 
    
    // this.cartService.getProductsInCart(this.hardwareStoreId)
    // .subscribe((data)=>{
    //   this.productsInCart = data;
    //   this.productsInCart.forEach((product)=>{
    //     this.total += (product.productPrice * product.productQuantity);
    //   })
    // })
    this.loadProductsInCart()
  } 

  loadProductsInCart() : void {
    this.cartService.getProductsInCartV2(this.hardwareStoreId, this.branchId)
      .subscribe((data) => {
        this.cartDetails = data;
        this.productsInCart = data.cartItems;
        this.productsInCart.forEach((product) => {
          this.total += (product.productPrice * product.productQuantity)
        })
        console.log(data)
      })
  }

  back(){
    if(this.fromComponent == 'vp'){
      this.route.navigate(['/view-product',this.hardwareStoreId,this.productId, this.branchId])
    }else{
      this.route.navigate(['/products',this.branchId, this.hardwareStoreId,'product-category','all',this.branchId,this.hardwareStoreId])
    }
  }

  increment(productInCart : ICart){
        // const index = this.productsInCart.findIndex(p => p.hardwareStoreId === productInCart.hardwareStoreId && p.cartId === productInCart.cartId && p.productId === productInCart.productId) 
        // this.productsInCart[index].productQuantity += 1

        // this.total += productInCart.productPrice
    this.cartService.incrementQuantity(productInCart.hardwareStoreId,productInCart.cartId,productInCart.productId, productInCart.branchId).subscribe((res)=>{
      if(res.success == 1){
        const index = this.productsInCart.findIndex(p => p.hardwareStoreId === productInCart.hardwareStoreId && p.cartId === productInCart.cartId && p.productId === productInCart.productId) 
        this.productsInCart[index].productQuantity += 1

        this.total += productInCart.productPrice
        alert(res.message)
      }
    })
  }
  decrement(productInCart : ICart){
        // const index = this.productsInCart.findIndex(p => p.hardwareStoreId === productInCart.hardwareStoreId && p.cartId === productInCart.cartId && p.productId === productInCart.productId)
        // this.productsInCart[index].productQuantity -= 1
        // this.total -= productInCart.productPrice
    this.cartService.decrementQuantity(productInCart.hardwareStoreId,productInCart.cartId,productInCart.productId, productInCart.branchId).subscribe((res)=>{
      if(res.success == 1){
        const index = this.productsInCart.findIndex(p => p.hardwareStoreId === productInCart.hardwareStoreId && p.cartId === productInCart.cartId && p.productId === productInCart.productId)
        this.productsInCart[index].productQuantity -= 1
        this.total -= productInCart.productPrice
        alert(res.message)
      }
    })
  }
  // TODO : fix the total with exact adjusted quantity
  adjustQuantityWithInput(adjustedItem : AdjustCartItemQuantity){
    
    this.cartService.adjustQuantity(adjustedItem.cart.hardwareStoreId, adjustedItem.cart.cartId, adjustedItem.cart.productId, adjustedItem.cart.branchId, { quantity : adjustedItem.cart.productQuantity})
      .subscribe((res) => {
        // this.total = (productInCart.productPrice * productInCart.productQuantity);
        if(adjustedItem.adjustedCartItemQuantity > adjustedItem.previousCartItemQuantity){
          const valueToBeMultiply = adjustedItem.cart.productQuantity - adjustedItem.previousCartItemQuantity;
          this.total += (adjustedItem.cart.productPrice * valueToBeMultiply);
        }else if(adjustedItem.adjustedCartItemQuantity < adjustedItem.previousCartItemQuantity){
          const valueToBeMultiply = adjustedItem.previousCartItemQuantity - adjustedItem.adjustedCartItemQuantity;
          this.total -= (adjustedItem.cart.productPrice * valueToBeMultiply)
        }
      }, (err) => {
        alert('Failed to adjust quantity.')
      })
    console.log(adjustedItem)
  }
  remove(productInCart : ICart){
    this.cartService.removeToCart(productInCart.hardwareStoreId,productInCart.cartId,productInCart.productId, productInCart.branchId).subscribe((res)=>{
      if(res.success == 1){
        this.total -= (productInCart.productPrice * productInCart.productQuantity);
        this.productsInCart = this.productsInCart.filter(p => p.hardwareStoreId === productInCart.hardwareStoreId && p.productId !== productInCart.productId && p.cartId !== productInCart.cartId);
        alert(res.message)
      }
    })
  }

  checkOut(){
    if(this.productsInCart.length > 0){
      this.route.navigate(['/check-out',this.hardwareStoreId, this.branchId])
      // this.checkOutToggle();
    }else{
      alert("There's no products added in cart.")
    }
  }
  // checkOutToggle(){
  //   const cart = document.querySelector('.cart') as HTMLDivElement;
  //   const checkOut = document.querySelector('.check-out') as HTMLDivElement;
  //   this.isOpen = !this.isOpen;
  //   if(this.isOpen){
  //     cart.classList.add('my-modal')
  //     checkOut.classList.add('my-modal')
  //   }else{
  //     cart.classList.remove('my-modal')
  //     checkOut.classList.remove('my-modal')
  //   }
  // }
  // cancel(){
  //   const cart = document.querySelector('.cart') as HTMLDivElement;
  //   const checkOut = document.querySelector('.check-out') as HTMLDivElement;
  //   this.isOpen = !this.isOpen;
  //   cart.classList.remove('my-modal')
  //   checkOut.classList.remove('my-modal')
  // }

}
