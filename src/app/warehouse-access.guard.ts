import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './services/account.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseAccessGuard implements CanActivate {
  constructor(private accountService : AccountService, private route : Router){

  }
  canActivate(){
    if(this.accountService.isLoggedIn()){
      if(this.accountService.getUserRole() == "SuperAdmin" || this.accountService.getUserRole() == "StoreOwner" || this.accountService.getUserRole() == "WarehouseAdmin"){
        return true;
      }else{
        
        this.route.navigate(['/home'])
        return false
      }
    }else{
      this.route.navigate(['/login'])
      return false;
    }
  }
  
}
