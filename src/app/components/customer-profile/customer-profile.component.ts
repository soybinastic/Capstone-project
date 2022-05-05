import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private customerService : CustomerService, private route : Router) { }

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
}
