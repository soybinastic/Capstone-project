import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerVerificationService {

  private url = environment.apiUrl
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { }

  post(data : any) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.accountService.getToken())
    } 

    return this.http.post<any>(this.url + 'api/Verification/post', data, httpHeaders)
  }

  verify(customerId : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.accountService.getToken())
    } 

    return this.http.put<any>(this.url + 'api/Verification/verify-customer/' + customerId, {}, httpHeaders)
  }

  get(id : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.accountService.getToken())
    } 

    return this.http.get<any>(this.url + 'api/Verification/get/' + id, httpHeaders)
  }

  getAll(): Observable<any[]> {
    const httpHeaders = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.accountService.getToken())
    }

    return this.http.get<any>(this.url + 'api/Verification/get/', httpHeaders)
  }
}
