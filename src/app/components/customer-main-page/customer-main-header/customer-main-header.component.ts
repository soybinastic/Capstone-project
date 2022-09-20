import { Component } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import { ControlService } from "src/app/services/control.service";
@Component({
    selector : 'customer-header',
    styleUrls : ['./customer-main-header.component.css'],
    templateUrl : './customer-main-header.component.html'
})
export class CustomerMainHeader{
    title = "Header"
    constructor(private accountService : AccountService, private controlService : ControlService){}
    isLoggedIn() : boolean {
        return this.accountService.isLoggedIn();
    }
    isCustomer() : boolean {
        return this.accountService.getUserRole() === "Customer";
    }

    onSearch(event : any) : void {
        const value : string = event.target.value;
        this.controlService.search(value);
    }
}