import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UserAdminService {
    private url = environment.apiUrl;
    //private url = "https://localhost:44367/";
    constructor(private http: HttpClient, private accountService: AccountService) { }

    //   addToCart(addToCart : IAddToCart) : Observable<any>{
    //     const httpHeader = {
    //       headers: new HttpHeaders()
    //       .set('Content-Type','application/json')
    //       .set('Authorization','Bearer '+this.accountService.getToken())
    //     } 

    //     return this.http.post<any>(this.url+'api/cart/add-to-cart',addToCart,httpHeader)
    //   }

    getVerifiedUsers(): Observable<any[]> {
        const httpHeader = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this.accountService.getToken())
        }

        return this.http.get<any[]>(this.url + 'api/Verification/verified-users', httpHeader);
    }

    getRegisteredCompanies(): Observable<any[]> {
        const httpHeader = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this.accountService.getToken())
        }

        return this.http.get<any[]>(this.url + 'api/Verification/registered-companies', httpHeader);
    }
}
