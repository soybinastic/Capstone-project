import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecieveProductService {

  private url = environment.apiUrl
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { } 

  add(data : any) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    return this.http.post<any>(this.url + 'api/RecieveProductReport/add-recieveproduct-report', data, httpHeaders)
  }
  addRecieveProduct(data : any, warehouseReportId : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    return this.http.post<any>(this.url + 'api/RecieveProductReport/add-recieveproduct/' + warehouseReportId, data, httpHeaders)
  } 
  update(data : any, recieveProductId : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  

    return this.http.put<any>(this.url + 'api/RecieveProductReport/update-recieveproduct/' + recieveProductId, data, httpHeaders)
  } 
  getReports(warehouseId : number) : Observable<any[]>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  

    return this.http.get<any[]>(this.url + 'api/RecieveProductReport/get-reports/' + warehouseId, httpHeaders)
  } 

  getReport(warehouseReportId : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  
    return this.http.get<any>(this.url + 'api/RecieveProductReport/get-report/' + warehouseReportId, httpHeaders)
  } 
  getRecieveProducts(warehouseReportId : number) : Observable<any[]>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    
    return this.http.get<any[]>(this.url + 'api/RecieveProductReport/get-recieveproducts/' + warehouseReportId, httpHeaders)
  } 

  getRecieveProduct(recieveProductId : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    return this.http.get<any>(this.url + 'api/RecieveProductReport/get-recieveproduct/' + recieveProductId, httpHeaders)
  }
}
