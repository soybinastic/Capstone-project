import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddTrasportAgent } from '../models/transport-agent/addtransportagent';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportagentService {

  private url = environment.apiUrl
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { } 

  addTransportAgent(transportAgent : IAddTrasportAgent) : Observable<any>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    
    return this.http.post(this.url+'api/transportagent/add-transp-agent', transportAgent, httpHeader)
  }
}
