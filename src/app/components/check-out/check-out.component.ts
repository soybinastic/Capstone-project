import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ICart } from 'src/app/models/cart-model/cart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPostOrder } from 'src/app/models/order-models/postorder';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  productsInCart : ICart[] = []
  hardwareStoreId : number
  total : number = 0

  orderForm :  FormGroup
  deliver : boolean = false
  buttonText : string = "Place Order";
  contactNumber : string = ""
  isValid : boolean = true
  messageError : string
  isSuccess : boolean = false
  constructor(private accountService : AccountService, private route : Router, private cartService : CartService, private urlParam : ActivatedRoute, private orderService : OrderService, private formBuilder : FormBuilder) {
    this.orderForm = formBuilder.group({
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      address : ['',[Validators.required]],
      email : ['',[Validators.required, Validators.email]],
      contactNo : ['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    const storeIdParam = this.urlParam.snapshot.paramMap.get('hardwareStoreId')
    this.hardwareStoreId = Number(storeIdParam) 
    if(this.accountService.isLoggedIn()){
       this.cartService.getProductsInCart(this.hardwareStoreId)
        .subscribe((data)=>{
          this.productsInCart = data;
          this.productsInCart.forEach((product)=>{
            this.total += (product.productPrice * product.productQuantity);
          })
        }) 
    }else{
      this.route.navigate(['/login'])
    }
  }

  order(){
    if(this.productsInCart.length > 0){
      
      if(this.orderForm.valid){
        this.contactNumber = this.orderForm.controls['contactNo'].value.toString()
        if(this.contactNumber.length >= 10 && this.contactNumber.length <= 13){
          this.createOrder()
          this.isValid = true
        }else{
          alert('Invalid')
          this.isValid = false
          this.messageError = 'Contact number must have 10 characters.'
        }
        
      }else{
        alert('Invalid')
        this.isValid = false
        this.messageError = 'Please fill up the form correctly.'
      }
    }else{
      alert("There's no one product that to be order.")
      this.isValid = false
      this.messageError = "There's no one product that to be order."
    }
  } 

  private createOrder(){
    const btn = document.getElementById('submit-btn') as HTMLButtonElement;
    const order : IPostOrder = {
      hardwareStoreId : this.hardwareStoreId,
      address : this.orderForm.controls['address'].value,
      firstName : this.orderForm.controls['firstName'].value,
      lastName : this.orderForm.controls['lastName'].value,
      email : this.orderForm.controls['email'].value,
      contactNo : this.orderForm.controls['contactNo'].value.toString(),
      deliver : this.deliver,
      products : this.productsInCart
    } 
    this.buttonText = "Processing..."
    btn.classList.remove('sbt-btn')
    btn.classList.add('btn-primary')
    this.orderService.postOrder(order)
    .subscribe((res)=>{
      if(res.success == 1){
        // alert(res.message)
        btn.classList.remove('btn-primary')
        btn.classList.add('btn-success')
        this.buttonText = "Order Successfully Posted"
        this.total = 0
        this.productsInCart = []
        this.isSuccess = true
      }
    }, (err)=>{
      this.buttonText = err.errors.message.toString()
      btn.classList.remove('btn-primary')
      btn.classList.add('btn-danger')
    })
  }
  isDeliver(){
    this.deliver = !this.deliver;
    alert(this.deliver)
  }
  back(){
    this.route.navigate(['/cart',this.hardwareStoreId,'p','none'])
  }
  

}
