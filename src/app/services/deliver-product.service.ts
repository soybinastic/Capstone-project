import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class DeliverProductService {
  private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { }
  // /api/DeliverProduct/deliver-product 
  deliverProduct(data : any) : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  

    return this.http.post<any>(this.url + 'api/DeliverProduct/deliver-product ', data, httpOptions)
  } 

  getDeliverProductReports(warehouseId : number) : Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    return this.http.get<any[]>(this.url + 'api/DeliverProduct/get-reports/' + warehouseId, httpOptions)
  }
}
