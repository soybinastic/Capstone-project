import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddToCart } from '../models/cart-model/addtocart';
import { ICart } from '../models/cart-model/cart';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = "https://localhost:44367/";
  constructor(private http : HttpClient ,private accountService : AccountService) { } 

  addToCart(addToCart : IAddToCart) : Observable<any>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.post<any>(this.url+'api/cart/add-to-cart',addToCart,httpHeader)
  }

  getProductsInCart(hardwareStoreId : number) : Observable<ICart[]>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<ICart[]>(this.url+'api/cart/get-products-in-cart/'+hardwareStoreId,httpHeader)
  }

  removeToCart(hardwareStoreId : number, cartId : number, productId : number) : Observable<any>{

    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    
    return this.http.delete<any>(this.url+'api/cart/remove-to-cart/'+hardwareStoreId+'/'+cartId+'/'+productId, httpHeader)
  } 

  incrementQuantity(hardwareStoreId : number, cartId : number, productId : number) : Observable<any>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.put<any>(this.url+'api/cart/increment-quantity/'+hardwareStoreId+'/'+cartId+'/'+productId, {}, httpHeader)
  } 

  decrementQuantity(hardwareStoreId : number, cartId : number, productId : number) : Observable<any>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.put<any>(this.url+'api/cart/decrement-quantity/'+hardwareStoreId+'/'+cartId+'/'+productId, {},httpHeader)
  }
}
