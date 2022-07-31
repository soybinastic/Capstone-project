import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseProductStatusReportService {

  private url = environment.apiUrl
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { } 

  addReport(data : any) : Observable<any>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.post<any>(this.url + 'api/WarehouseProductStatusReport/add-report', data, httpHeader)
  } 
  addStatusReport(data : any,warehouseReportId : number) : Observable<any>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    
    return this.http.post<any>(this.url + 'api/WarehouseProductStatusReport/add-status-report/' + warehouseReportId, data, httpHeader)
  } 

  removeStatusReport(productStatusReportId : number) : Observable<any>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    
    return this.http.delete<any>(this.url + 'api/WarehouseProductStatusReport/delete-status-report/' + productStatusReportId, httpHeader)
  }
  getProductStatusReports(warehouseReportId : number) : Observable<any[]>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  
    return this.http.get<any[]>(this.url + 'api/WarehouseProductStatusReport/get-status-reports/' + warehouseReportId, httpHeader)
  }
  getReports() : Observable<any[]>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  

    return this.http.get<any[]>(this.url + 'api/WarehouseProductStatusReport/get-reports', httpHeader)
  } 
  getReport(warehouseReportId : number) : Observable<any>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  

    return this.http.get<any>(this.url + 'api/WarehouseProductStatusReport/get-report/' + warehouseReportId, httpHeader)
  } 

  removeReport(warehouseReportId : number) : Observable<any>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }   

    return this.http.delete<any>(this.url + 'api/WarehouseProductStatusReport/delete-report/' + warehouseReportId, httpHeader)
  }
}
