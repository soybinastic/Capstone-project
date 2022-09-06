import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  customer : any = {}
  isLoaded : boolean = false
  message : string = 'Processing...'
  logoutText : string = "Logout"
  constructor(private customerService : CustomerService, private route : Router, 
    private accountService : AccountService) { }

  ngOnInit(): void {
    this.loadCustomer()
  }
  
  loadCustomer(){
    this.customerService.getCustomerInfo()
      .subscribe((data) => {
        this.customer = data
        console.log(this.customer)
        this.isLoaded = true
      }, (err) => {
        this.message = 'Something went wrong'
      })
  }
  navigate(path : string, param : boolean = false) : void {
    if(path == '/verification'){
      if(!param){
        this.route.navigate([path])
      }else{
        alert('You are already verified')
      }
    }else{
      this.route.navigate([path])
    }
  }

  logOut(){
    this.logoutText = "Logging out..."
    this.accountService.logOut(this.accountService.getToken()).subscribe((res)=>{
      if(res.success == 1)
      {
        alert(res.message)
        this.logoutText = "Logout"
        this.accountService.removeToken()
        localStorage.clear()
        this.route.navigate(['/login']).then(()=> window.location.reload())
      }
    })
  }
}
