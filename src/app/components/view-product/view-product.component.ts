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

  prevUrl : string | null
  branchId : number
  productId : number
  hardwareStoreId : number
  // product : IProduct
  product : any = {}
  cart: ICart[] = [] 
  customer : ICustomer

  cartCounter : number = 0 
  cartBtnText : string = 'Add To Cart'
  constructor(private productService : ProductService,private route : Router ,private urlParam : ActivatedRoute, private accountService : AccountService, private customerService : CustomerService, private cartService : CartService) { }

  ngOnInit(): void {  
    const storeIdParam = this.urlParam.snapshot.paramMap.get('hardwareStoreId');
    const productIdParam = this.urlParam.snapshot.paramMap.get('productId')
    const branchIdParam = this.urlParam.snapshot.paramMap.get('branchId')

    this.hardwareStoreId = Number(storeIdParam)
    this.branchId = Number(branchIdParam)
    this.productId = Number(productIdParam)
    this.prevUrl = this.urlParam.snapshot.queryParamMap.get('prev_url')
    if(!!localStorage.getItem('unauthorize_adding_to_cart')){
      localStorage.removeItem('unauthorize_adding_to_cart')
    }
    // this.productService.getProduct(this.branchId, this.productId)
    // .subscribe((data)=>{
    //   this.product = data 
    //   console.log(this.product)
    // }) 
    this.loadProduct()
    

    // this.cartService.getProductsInCart(this.branchId)
    // .subscribe((data)=>{
    //   this.cart = data;
    //   this.cart.forEach((product)=>{
    //     this.cartCounter += product.productQuantity;
    //   })
    // })
    if(this.accountService.isLoggedIn()){
      this.loadCustomerInfo()
      this.loadProductsInCart()
    }
  } 
  loadCustomerInfo() : void {
    this.customerService.getCustomerInfo()
    .subscribe((data)=> {
      this.customer = data
      console.log('customer info')
      console.log(this.customer)
    }, (err)=> console.log(err))
  }
  loadProductsInCart() : void {
    this.cartService.getProductsInCartV2(this.hardwareStoreId, this.branchId)
      .subscribe((data) => {
        this.cart = data.cartItems
        this.cart.forEach((product) => {
          this.cartCounter += product.productQuantity;
        })
      })
  }
  
  loadProduct() : void {
    this.productService.getHardwareProduct(this.branchId, this.productId)
      .subscribe((data) => this.product = data) 
  }

  back(){
    this.route.navigate(['products',this.product.branchId,this.product.hardwareStoreId,'product-category',this.product.categoryId, this.product.branchId,this.product.hardwareStoreId]).then(()=> window.location.reload())
  }
  goToCart(){
    this.route.navigate(['/cart',this.hardwareStoreId, this.branchId,'vp',this.product.hardwareProductId])
    .then(()=> window.location.reload())
  }  
// test to add to cart for just secure
  addToCart(product: any){
    if(this.accountService.isLoggedIn()){
      if(product.stockNumber >= 1){
        this.createCart(product)
      }else{
        alert('Out of stock')
      }
    }else{
      localStorage.setItem('unauthorize_adding_to_cart', `${this.hardwareStoreId},${this.branchId},${this.productId}`)
      this.route.navigate(['/login']).then(()=> window.location.reload())
    }
  } 

  onAddToCart(addProductToCart : IAddToCart) : void {
    this.cartService.addToCart(addProductToCart)
        .subscribe((res)=>{
          if(res.success == 1){
            console.log('With index')
            console.log(this.cart)
            this.cartCounter += 1
            this.product.stockNumber -= 1
            alert(res.message)
            this.cartBtnText = 'Add To Cart'
          }
        })
  }
  private createCart(product: any){

    // console.log(product)
    //reference
    const cart : ICart = {
      cartId : 0,
      hardwareStoreId : product.hardwareStoreId,
      branchId : product.branchId,
      categoryId : product.categoryId,
      productId : product.hardwareProductId,
      customerId : this.customer.customerId,
      productName : product.name,
      productBrand : product.brand,
      productDescription : product.description,
      productPrice : product.price,
      productQuality : product.quality,
      productQuantity : 1,
    }  
    // console.log(cart)
    // //create add to cart object to post to the server
    const addProductToCart : IAddToCart = {
      hardwareStoreId : product.hardwareStoreId,
      branchId : product.branchId,
      productId : product.hardwareProductId,
      categoryId : product.categoryId,
      productName : product.name,
      productDescription : product.description,
      productBrand : product.brand,
      productPrice : product.price,
      productQuality : product.quality
    }
    console.log(addProductToCart)
    // TODO : fix add to cart bug.
    this.cartBtnText = 'Adding...'
    const index = this.cart.findIndex(p => p.productId === product.hardwareProductId
      && p.hardwareStoreId === product.hardwareStoreId && p.branchId === product.branchId)
      console.log(index)
    if(index > -1){
      this.cart[index].productQuantity += 1
      if(product.stockNumber > 0){
       
        this.onAddToCart(addProductToCart)
        // this.cartService.addToCart(addProductToCart)
        // .subscribe((res)=>{
        //   if(res.success == 1){
        //     console.log('With index')
        //     console.log(this.cart)
        //     this.cartCounter += 1
        //     this.product.stockNumber -= 1
        //     alert(res.message)
        //     this.cartBtnText = 'Add To Cart'
        //   }
        // })
      }
    }else{
      this.cart.push(cart)
      
      this.onAddToCart(addProductToCart)
      // this.cartService.addToCart(addProductToCart)
      //   .subscribe((res)=>{
      //     if(res.success == 1){
      //       console.log('With index')
      //       console.log(this.cart)
      //       this.cartCounter += 1
      //       this.product.stockNumber -= 1
      //       alert(res.message)
      //       this.cartBtnText = 'Add To Cart'
      //     }
      //   })
    }

  }

}
