import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepositSlipService {

  private url = environment.apiUrl;
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { }

  saveData(data : any) : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.accountService.getToken())
    }
    
    return this.http.post<any>(this.url + 'api/DepositSlip/add', data, httpOptions)
  }
  getDepositSlips() : Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.accountService.getToken())
    }

    return this.http.get<any[]>(this.url + 'api/DepositSlip/get', httpOptions)
  }
}
