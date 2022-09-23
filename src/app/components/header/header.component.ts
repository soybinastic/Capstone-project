import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentRoute : string
  isLogin : boolean;
  role: string;
  constructor(private accountService: AccountService, private route: Router) {
      route.events.subscribe(() => {
        this.currentRoute = route.url
        //console.log(route.url)
      })
   }

  ngOnInit(): void { 
    this.isLogin = this.accountService.isLoggedIn();
    if(this.isLogin){
      this.role = this.accountService.getUserRole();
    }
    
  } 

  logOut(){
    this.accountService.logOut(this.accountService.getToken()).subscribe((res)=>{
      if(res.success == 1)
      {
        alert(res.message)
        this.accountService.removeToken()
        localStorage.clear()
        this.route.navigate(['/login']).then(()=> window.location.reload())
      }
    })
  }

  isShow() : boolean {
    return (this.currentRoute !== '/welcome' 
      && this.currentRoute !== '/privacy-and-termconditions' 
      && this.currentRoute !== '/registration'
      && this.currentRoute !== '/success'
      && this.currentRoute !== '/cancel'
      && !this.currentRoute.includes('/stores')
      && (this.accountService.getUserRole() === "Admin" ||
      this.accountService.getUserRole() === "TransportAgent" ||
      this.accountService.getUserRole() === "StoreOwner" ||
      this.accountService.getUserRole() === "StoreAdmin" ||
      this.accountService.getUserRole() === "WarehouseAdmin" ||
      this.accountService.getUserRole() === "SuperAdmin" ||
      this.accountService.getUserRole() === "Cashier" ||
      this.accountService.getUserRole() === "SalesClerk"))
  }

}
