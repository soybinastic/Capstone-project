import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICart } from 'src/app/models/cart-model/cart';
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
  hardwareStoreId : number;
  productId : number;
  fromComponent : any
  //<-
  total : number = 0
  productsInCart : ICart[] = []
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
    
    this.cartService.getProductsInCart(this.hardwareStoreId)
    .subscribe((data)=>{
      this.productsInCart = data;
      this.productsInCart.forEach((product)=>{
        this.total += (product.productPrice * product.productQuantity);
      })
    })
  }

  back(){
    if(this.fromComponent == 'vp'){
      this.route.navigate(['/view-product',this.hardwareStoreId,this.productId])
    }else{
      this.route.navigate(['/hardware-store-page',this.hardwareStoreId,'products',this.hardwareStoreId,'product-category','all',this.hardwareStoreId])
    }
  }

  increment(productInCart : ICart){
    this.cartService.incrementQuantity(productInCart.hardwareStoreId,productInCart.cartId,productInCart.productId).subscribe((res)=>{
      if(res.success == 1){
        const index = this.productsInCart.findIndex(p => p.hardwareStoreId === productInCart.hardwareStoreId && p.cartId === productInCart.cartId && p.productId === productInCart.productId) 
        this.productsInCart[index].productQuantity += 1

        this.total += productInCart.productPrice
        alert(res.message)
      }
    })
  }
  decrement(productInCart : ICart){
    this.cartService.decrementQuantity(productInCart.hardwareStoreId,productInCart.cartId,productInCart.productId).subscribe((res)=>{
      if(res.success == 1){
        const index = this.productsInCart.findIndex(p => p.hardwareStoreId === productInCart.hardwareStoreId && p.cartId === productInCart.cartId && p.productId === productInCart.productId)
        this.productsInCart[index].productQuantity -= 1
        this.total -= productInCart.productPrice
        alert(res.message)
      }
    })
  }
  remove(productInCart : ICart){
    this.cartService.removeToCart(productInCart.hardwareStoreId,productInCart.cartId,productInCart.productId).subscribe((res)=>{
      if(res.success == 1){
        this.total -= (productInCart.productPrice * productInCart.productQuantity);
        this.productsInCart = this.productsInCart.filter(p => p.hardwareStoreId === productInCart.hardwareStoreId && p.productId !== productInCart.productId && p.cartId !== productInCart.cartId);
        alert(res.message)
      }
    })
  }

  checkOut(){
    if(this.productsInCart.length > 0){
      this.route.navigate(['/check-out',this.hardwareStoreId])
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
