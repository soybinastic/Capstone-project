import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAddToCart } from 'src/app/models/cart-model/addtocart';
import { ICart } from 'src/app/models/cart-model/cart';
import { ICustomer } from 'src/app/models/customer/customer';
import { IProduct } from 'src/app/models/product-models/products';
import { AccountService } from 'src/app/services/account.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  hardwareStoreId : number
  productId : number
  product : IProduct
  cart: ICart[] = [] 
  customer : ICustomer

  cartCounter : number = 0
  constructor(private productService : ProductService,private route : Router ,private urlParam : ActivatedRoute, private accountService : AccountService, private customerService : CustomerService, private cartService : CartService) { }

  ngOnInit(): void {  
    const storeIdParam = this.urlParam.snapshot.paramMap.get('hardwareStoreId');
    const productIdParam = this.urlParam.snapshot.paramMap.get('productId')
     
    this.hardwareStoreId = Number(storeIdParam)
    this.productId = Number(productIdParam)

    this.productService.getProduct(this.hardwareStoreId, this.productId)
    .subscribe((data)=>{
      this.product = data 
      console.log(this.product)
    }) 

    this.customerService.getCustomerInfo()
    .subscribe((data)=> {
      this.customer = data
      console.log('customer info')
      console.log(this.customer)
    }, (err)=> console.log(err))

    this.cartService.getProductsInCart(this.hardwareStoreId)
    .subscribe((data)=>{
      this.cart = data;
      this.cart.forEach((product)=>{
        this.cartCounter += product.productQuantity;
      })
    })
  } 

  back(){
    this.route.navigate(['/hardware-store-page',this.product.hardwareStoreId,'products',this.product.hardwareStoreId,'product-category',this.product.categoryId,this.product.hardwareStoreId]).then(()=> window.location.reload())
  }
  goToCart(){
    this.route.navigate(['/cart',this.hardwareStoreId,'vp',this.product.productId])
    .then(()=> window.location.reload())
  }  
// test to add to cart for just secure
  addToCart(product: IProduct){
    if(this.accountService.isLoggedIn()){
      if(product.stockNumber >= 1){
        this.createCart(product)
      }else{
        alert('Out of stock')
      }
    }else{
      this.route.navigate(['/login']).then(()=> window.location.reload())
    }
  } 
  private createCart(product: IProduct){
    //reference
    const cart : ICart = {
      cartId : 0,
      hardwareStoreId : product.hardwareStoreId,
      categoryId : product.categoryId,
      productId : product.productId,
      customerId : this.customer.customerId,
      productName : product.name,
      productBrand : product.brand,
      productDescription : product.description,
      productPrice : product.price,
      productQuality : product.quality,
      productQuantity : 1,
    }  
    //create add to cart object to post to the server
    const addProductToCart : IAddToCart = {
      hardwareStoreId : product.hardwareStoreId,
      productId : product.productId,
      categoryId : product.categoryId,
      productName : product.name,
      productDescription : product.description,
      productBrand : product.brand,
      productPrice : product.price,
      productQuality : product.quality
    }

    const index = this.cart.findIndex(p => p.productId === product.productId
      && p.hardwareStoreId === product.hardwareStoreId)
    if(index > -1){
      this.cart[index].productQuantity += 1
      if(this.cart[index].productQuantity <= product.stockNumber){
        this.cartService.addToCart(addProductToCart)
        .subscribe((res)=>{
          if(res.success == 1){
            console.log('With index')
            console.log(this.cart)
            this.cartCounter += 1
            alert(res.message)
          }
        })
      }
    }else{
      this.cart.push(cart)
      this.cartService.addToCart(addProductToCart)
        .subscribe((res)=>{
          if(res.success == 1){
            console.log('With index')
            console.log(this.cart)
            this.cartCounter += 1
            alert(res.message)
          }
        })
    }

  }

}
