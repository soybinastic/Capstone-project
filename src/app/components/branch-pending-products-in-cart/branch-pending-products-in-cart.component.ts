import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-branch-pending-products-in-cart',
  templateUrl: './branch-pending-products-in-cart.component.html',
  styleUrls: ['./branch-pending-products-in-cart.component.css']
})
export class BranchPendingProductsInCartComponent implements OnInit {

  pendingItemsInCart : any[] = []
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.loadPendingItemsInCart()
  }
  loadPendingItemsInCart() : void {
    this.cartService.getPendingItemsInCart()
      .subscribe((data) => {
        this.pendingItemsInCart = data
        console.log(this.pendingItemsInCart)
      })
  } 

  deletePendingItemInCart(cartId : number) : void {

    console.log(cartId)
    this.cartService.deletePendingItemInCart(cartId)
      .subscribe((res) => {
        alert(res.message)
        this.pendingItemsInCart = this.pendingItemsInCart.filter(cp => cp.id != cartId)
      })
  }
}
