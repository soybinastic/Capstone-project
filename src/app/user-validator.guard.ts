import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountService } from './services/account.service';

@Injectable({
    providedIn: 'root'
})
export class UserValidatorGuard implements CanActivate {
    constructor(private accountService: AccountService, private route: Router) { }
    canActivate() {
        if (this.accountService.isLoggedIn()) {
            if (this.accountService.getUserRole() == 'Admin' || this.accountService.getUserRole() == 'UserValidator') {
                return true;
            } else {
                this.route.navigate(['/home'])
                return false
            }
        } else {
            this.route.navigate(['/login'])
            return false
        }
    }

}
