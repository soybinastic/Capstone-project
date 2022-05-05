import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from './services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class CheckOutAccessGuard implements CanActivate {
  constructor(private customerService : CustomerService, private route : Router){}
  async canActivate(){
    if(await this.isVerified()){
      return true
    }else{
      this.route.navigate(['/verification'])
      return false
    }
    
  }
  async isVerified() : Promise<boolean> {
    const data = this.customerService.getCustomerInfo().toPromise()
    return (await data).isVerified
  }
}
