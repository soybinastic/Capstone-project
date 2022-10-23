
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './services/account.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyValidatorGuard implements CanActivate {
    constructor(private accountService: AccountService, private route: Router) { }
    canActivate() {
        if (this.accountService.isLoggedIn()) {
            if (this.accountService.getUserRole() == 'Admin' || this.accountService.getUserRole() == 'CompanyValidator') {
                return true;
            } else {
                if (this.accountService.getUserRole() == 'UserValidator') {
                    this.route.navigate(['/main-admin', 'user-verification-list'])
                    return false
                }
                this.route.navigate(['/home'])
                return false
            }
        } else {
            this.route.navigate(['/login'])
            return false
        }
    }

}