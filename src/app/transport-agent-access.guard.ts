import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './services/account.service';

@Injectable({
    providedIn: 'root'
  })
  export class TransportAgentAccessGuard implements CanActivate {
    constructor(private accountService : AccountService, private router : Router){}
    canActivate(){
      if(this.accountService.isLoggedIn()){
        if(this.accountService.getUserRole() == 'TransportAgent'){
          return true;
        }else if(this.accountService.getUserRole() == 'Cashier'){
            this.router.navigate(['/branch','orders', 'confirmation'])
            return false;
        }else{
            this.router.navigate(['/branch','orders'])
            return false;
        }
      }else{
        this.router.navigate(['/login'])
        return false;
      }
    }
    
  }