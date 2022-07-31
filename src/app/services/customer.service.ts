import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from '../models/customer/customer';
import { IRegister } from '../models/customer/register';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = environment.apiUrl
  // private url = "https://localhost:44367/";
  constructor(private http: HttpClient, private accountService : AccountService) { } 

  register(customer:IRegister): Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
    } 
    return this.http.post<any>(this.url+'api/customer/register-customer',customer,httpHeaders)
  } 

  getCustomerInfo() : Observable<ICustomer>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    
    return this.http.get<ICustomer>(this.url+'api/customer/get-customer-info', httpHeaders)
  }

  update(data : any) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.accountService.getToken())
    } 
    return this.http.put(this.url + 'api/Customer/update', data, httpHeaders)
  }
}
