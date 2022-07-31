import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderRecieveImageService {

  private url = environment.apiUrl;
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { }

  addImage(data : any, orderId : number) : Observable<any[]>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.post<any[]>(this.url + 'api/CustomerOrderRecieveImage/add-customer-images/' + orderId, data, httpHeaders)
  }

  getImages(orderId : number) : Observable<any[]>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<any[]>(this.url + 'api/CustomerOrderRecieveImage/get-images/' + orderId, httpHeaders)
  }
}
