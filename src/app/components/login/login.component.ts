import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogIn } from 'src/app/models/accountmodels/login';
import { AccountService } from 'src/app/services/account.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string; 
  message: string;
  isValid: boolean = true;
  model : ILogIn
  btnText : string = "Sign In"

  form : FormGroup
  constructor(private accountService: AccountService , private route : Router, private fb : FormBuilder) {
    this.form = fb.group({
      username : ['', Validators.required],
      password : ['', [Validators.required, Validators.minLength(5)]]
    })
   }

  ngOnInit(): void {
    if(this.accountService.isLoggedIn()){
      this.route.navigate(['/home'])
    }
  }
  signIn(){
    const user : ILogIn = {
      userName : this.form.controls['username'].value,
      password : this.form.controls['password'].value
    } 

    console.log(user)
  } 

  invalidInput() : boolean {
    return this.form.invalid
  }

  logIn(){ 
    
    // if(!this.username || !this.password)
    // {
    //   this.message = !this.username ? 'Username is required' : 'Password is required.'
    //   this.isValid = false; 
    //   return;
    // }  
    if(this.form.valid){
      this.message = ''
      this.isValid = true;

      const userLogIn :  ILogIn = {
        userName : this.form.controls['username'].value,
        password : this.form.controls['password'].value
      } 
      this.btnText = "Signing in..."
      this.accountService.logIn(userLogIn)
      .subscribe((res) => 
      { 
        this.btnText = "Sign In"
        if(res.success == 1)
        { 
          this.accountService.setToken(res.token)
          this.isValid = true; 
          const unauhtorize_adding_to_cart = localStorage.getItem('unauthorize_adding_to_cart')
          if(!!unauhtorize_adding_to_cart){
            const values = unauhtorize_adding_to_cart.split(',')
            this.route.navigate(['/view-product',values[0],values[2],values[1]]).then(() => window.location.reload())
          }else{
            this.route.navigate(['/home']).then(()=> window.location.reload())
          }
          //alert(this.accountService.getUserRole().toString())
          this.onNavigate(this.accountService.getUserRole());
        }
      }, (err)=>{
        this.btnText = "Sign In"
        this.message = err.error.message;
        this.isValid = false;
      })
    }
  }
  onNavigate(role : string) : void {
    if(role == "WarehouseAdmin" || role == "StoreOwner" || role == "SuperAdmin"){
      this.route.navigate(['/ware-house','main-page']).then(()=> window.location.reload())
    }else if(role == "Customer"){
      this.route.navigate(['/']).then(()=> window.location.reload())
    }else if(role == "StoreAdmin" || role == "Cashier"){
      this.route.navigate(['/branch']).then(()=> window.location.reload())
    }else if(role == "TransportAgent"){
      this.route.navigate(['/branch', 'orders', 'list']).then(()=> window.location.reload())
    }else if(role == "Cashier"){
      this.route.navigate(['/branch', 'orders', 'confirmation']).then(()=> window.location.reload())
    }else if(role == "SalesClerk"){
      this.route.navigate(['/branch', 'orders', 'to-prepare']).then(()=> window.location.reload())
    }else if(role == "Admin"){
      this.route.navigate(['/main-admin'])
    }
  }
}
