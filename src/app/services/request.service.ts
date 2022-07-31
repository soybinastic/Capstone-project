import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private url = environment.apiUrl
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { }

  send(data : any) : Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.post<any>(this.url + 'api/Request/send-requestproduct', data, httpOptions)
  }
  getRequestsSend() : Observable<any[]>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    
    return this.http.get<any[]>(this.url + 'api/Request/get-requests-send', httpOptions)
  }
  getBranchRequests() : Observable<any[]>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<any[]>(this.url + 'api/Request/get-branch-requests', httpOptions)
  }
}
