import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import { CustomerService } from "src/app/services/customer.service";

@Component({
    selector : 'customer-main',
    styleUrls: ['./customer-main.component.css'],
    templateUrl : './customer-main.component.html'
})
export class CustomerMain implements OnInit {
    title = "Main"
    message : string = "Please wait..."
    
    constructor(private customerService : CustomerService, private accountService : AccountService){ }
    ngOnInit(): void {
        if(this.accountService.isLoggedIn() && this.accountService.getUserRole() === "Customer"){
            this.customerService.getCustomerInfo()
                .subscribe(data => {
                    console.log(data)
                    localStorage.setItem("customer_lat", data.latitude.toString());
                    localStorage.setItem("customer_lng", data.longitude.toString());
                    this.message = ""
                })
        }else{
            this.message = "";
        }
    }
    isLoggedIn() : boolean{
        return this.accountService.isLoggedIn() && this.accountService.getUserRole() === "Customer"
    }

}