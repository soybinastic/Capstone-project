import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyRegisteredService {

  private url = environment.apiUrl;
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { }

  register(data : any) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    } 

    return this.http.post<any>(this.url + 'api/CompanyRegister/register', data)
  }
  get(id : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.accountService.getToken())
    }
    
    return this.http.get<any>(this.url + 'api/CompanyRegister/get/' + id, httpHeaders)
  }
  getAll() : Observable<any[]>{
    const httpHeaders = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.accountService.getToken())
    }
    return this.http.get<any[]>(this.url + 'api/CompanyRegister/get/', httpHeaders)
  }
  delete(id : number) : Observable<any> {
    const httpHeaders = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.accountService.getToken())
    }

    return this.http.delete<any>(this.url + 'api/CompanyRegister/delete/' + id, httpHeaders)
  }
}
