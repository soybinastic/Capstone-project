import { Component, OnInit } from '@angular/core';
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

  constructor(private accountService: AccountService , private route : Router) { }

  ngOnInit(): void {
    if(this.accountService.isLoggedIn()){
      this.route.navigate(['/home'])
    }
  }

  logIn(){ 
    this.message = ''
    this.isValid = true;
    if(!this.username || !this.password)
    {
      this.message = !this.username ? 'Username is required' : 'Password is required.'
      this.isValid = false; 
      return;
    }  
    const userLogIn : ILogIn = {
      userName : this.username,
      password: this.password
    } 
    this.accountService.logIn(userLogIn)
    .subscribe((res) => 
    { 
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
        
        alert(this.accountService.getUserRole().toString())
      }
    }, (err)=>{
      this.message = err.error.message.toString();
      this.isValid = false;
    })
  }
}
