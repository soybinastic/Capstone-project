import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private url = environment.apiUrl
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { }

  getTodaySales() : Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<any>(this.url + 'api/Sale/get-today-sales', httpOptions)
  }
  getSales(date : string, filterBy : string) : Observable<any>{
    
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<any>(this.url + 'api/Sale/get-sales?date=' + date + '&filterBy=' + filterBy, httpOptions)
  }

  addReport(data : any) : Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    
    return this.http.post<any>(this.url + 'api/Sale/add-bestselling-report', data, httpOptions)
  }
  addSaleReport(data : any) : Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }

    return this.http.post<any>(this.url + 'api/Sale/add-sale-report', data, httpOptions)
  }
  getSaleReports() : Observable<any[]>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }

    return this.http.get<any[]>(this.url + 'api/Sale/get-sale-reports', httpOptions)
  }
  getReportsByBranch() : Observable<any[]>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }

    return this.http.get<any[]>(this.url + 'api/Sale/get-reports-by-branch', httpOptions)
  }
  getReportsByWarehouse() : Observable<any[]>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }

    return this.http.get<any[]>(this.url + 'api/Sale/get-reports-by-warehouse', httpOptions)
  }

  getMonthlySales(year : number) : Observable<any[]>{
    
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    return this.http.get<any[]>(this.url + 'api/Sale/get-monthly-totalsales?year='+year, httpOptions)
  }
  getBestSellingProducts(date : string, filterBy : string) : Observable<any[]>{
    
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<any[]>(this.url + 'api/Sale/get-bestselling-products?date='+ date + '&filterBy=' + filterBy, httpOptions)
  } 

  getMonthSalesSummary(date : string) : Observable<any> {
    
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    
    return this.http.get<any>(this.url + 'api/Sale/get-month-summary-sales?date=' + date, httpOptions)
  } 

  getSaleItem(date : string, filterBy : string) : Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.accountService.getToken())
    }
    return this.http.get<any[]>(this.url + 'api/Sale/get-sale-item?date=' + date + '&filterBy=' + filterBy, httpOptions)
  }

  download(id : number, or : string) : Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders()
    //     .set('Content-Type', 'application/json')
    //     .set('Authorization', 'Bearer ' + this.accountService.getToken())
    // }

    return this.http.get<any>(this.url + 'api/Sale/download/' + id + '?order_ref=' + or)
  } 

  dowloadOr(id: number, or : string){
    window.location.href = this.url + 'api/Sale/download/' + id + '?order_ref=' + or
  }
}
