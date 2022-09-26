import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUpdateOrder } from '../models/order-models/updateorder';
import { IAddProduct } from '../models/product-models/addproduct';
import { IProduct } from '../models/product-models/products';
import { IUpdateProduct } from '../models/product-models/updateproduct';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.apiUrl
  // private url = "https://localhost:44367/";

  constructor(private http : HttpClient, private accountService : AccountService) { } 

  getHardwareProducts(branchId : number, search : string = "") : Observable<any[]>{
    // /api/Product/get-hardwareproducts/{branchId}
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
    } 

    return this.http.get<any[]>(this.url + 'api/Product/get-hardwareproducts/' + branchId + '?search=' + search, httpHeader)
  }
  getHardwareProductByCategory(branchId : number, categoryId : number) : Observable<any[]>{
    // /api/Product/get-hardwareproduct-by-category/{branchId}/{categoryId}
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
    } 
    return this.http.get<any[]>(this.url + 'api/Product/get-hardwareproduct-by-category/' + branchId + '/' + categoryId, httpHeader)
  } 

  getHardwareProduct(branchId : number, productId : number) : Observable<any>{
    // /api/Product/get-hardwareproduct/{branchId}/{productId}
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
    } 

    return this.http.get<any>(this.url + 'api/Product/get-hardwareproduct/' + branchId + '/' + productId, httpHeader)
  }

  getProductsByCategory(hardwareStoreId:number, categoryId:number) : Observable<IProduct[]>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
    } 
    return this.http.get<IProduct[]>(this.url+'api/product/get-products-by-category/'+hardwareStoreId+'/'+categoryId, httpHeader)
  }
  getAllProductOfStore(hardwareStoreId: number): Observable<IProduct[]>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
    } 

    return this.http.get<IProduct[]>(this.url+'api/product/get-products/'+hardwareStoreId, httpHeader)
  } 
  getProduct(hardwareStoreId: number, productId:number) : Observable<IProduct>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
    }  

    return this.http.get<IProduct>(this.url+'api/product/get-product/'+hardwareStoreId+'/'+productId, httpHeader)
  }
  
  getProductToUpdate(hardwareStoreId: number, productId: number) : Observable<IUpdateProduct>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
    }  

    return this.http.get<IUpdateProduct>(this.url+'api/product/get-product/'+hardwareStoreId+'/'+productId, httpHeader)
  }

  addProduct(addProduct : IAddProduct) : Observable<any>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.post<any>(this.url+'api/product/add-product',addProduct,httpHeader)
  } 
  updateProduct(productId:number, updatedProduct: IUpdateProduct): Observable<any>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.put<any>(this.url+'api/product/update-product/'+productId,updatedProduct,httpHeader)
  } 

  deleteProduct(productId : number) : Observable<any>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.delete<any>(this.url+'api/product/delete-product/'+productId, httpHeader)
  }
}
