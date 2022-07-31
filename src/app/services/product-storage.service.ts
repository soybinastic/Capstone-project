import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductStorageService {
  private url = environment.apiUrl;
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { } 

  add(data : any) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  

    return this.http.post(this.url+'api/ProductStorage/add-product', data , httpHeaders)
  } 

  update(data : any , productId : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.put(this.url+'api/ProductStorage/update-product/'+productId, data ,
    httpHeaders)
  }
  updateProductImage(data : any, hardwareProductId : number) : Observable<any>{
    
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    return this.http.post<any>(this.url+'api/ProductStorage/update-product-image/' + hardwareProductId, data ,
    httpHeaders)
  }
  getAvailableInStocks(warehouseId : number) : Observable<any[]>{
    const httpHeaders = {
      headers : new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.accountService.getToken())
    } 

    return this.http.get<any[]>(this.url + 'api/ProductStorage/available-products/' + warehouseId ,httpHeaders)
  } 
  getProducts(warehouseId : number) : Observable<any[]>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<any[]>(this.url+'api/ProductStorage/get-products/'+warehouseId, httpHeaders)
  }
  getProduct(warehouseId : number, productId : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+ this.accountService.getToken())
    }  

    return this.http.get<any>(this.url + 'api/ProductStorage/get-product/' + warehouseId + '/'+ productId, httpHeaders)
  } 

  delete(warehouseId : number , productId : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  

    return this.http.delete<any>(this.url + 'api/ProductStorage/delete-product/'+ warehouseId + '/' + productId, httpHeaders)
  }
}
