import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';

@Injectable({
    providedIn : 'root'
})
export class PaymentService {
    private readonly url : string = environment.apiUrl;
    
    constructor(private client : HttpClient, private accountService : AccountService){}

    checkOut(dashboardId : number, successUrl : string = "", cancelUrl : string = "") : Observable<any> {
        const httpOptions = {
            headers : new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this.accountService.getToken())
        }

        return this.client
            .post<any>(this.url + 'api/Payment/checkout/' + dashboardId + '?success=' + successUrl + '&cancel=' + cancelUrl, {}, httpOptions);
    }
}