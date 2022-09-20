import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddToCart } from '../models/cart-model/addtocart';
import { ICart } from '../models/cart-model/cart';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { CartDetails } from '../models/cart-model/cartDetails.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = environment.apiUrl;
  //private url = "https://localhost:44367/";
  constructor(private http : HttpClient ,private accountService : AccountService) { } 

  addToCart(addToCart : IAddToCart) : Observable<any>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.post<any>(this.url+'api/cart/add-to-cart',addToCart,httpHeader)
  }

  adjustQuantity(hardwareStoreId : number, cartId : number, productId : number, branchId : number, adjustQuantity : any) : Observable<any> {

    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  

    return this.http.put<any>(this.url + 'api/cart/adjust-quantity/' + hardwareStoreId + '/' + cartId + '/' + productId + '/' + branchId, adjustQuantity, httpHeader)

  }
  getProductsInCart(hardwareStoreId : number) : Observable<ICart[]>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<ICart[]>(this.url+'api/cart/get-products-in-cart/'+hardwareStoreId,httpHeader)
  }
  getProductsInCartV2(hardwareStoreId : number, branchId: number) : Observable<CartDetails>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<CartDetails>(this.url+'api/cart/get-products-in-cart/'+hardwareStoreId + '/' + branchId,httpHeader)
  }
  // /api/cart/get-products-pending-in-cart
  getPendingItemsInCart() : Observable<any[]> {
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<any[]>(this.url + 'api/cart/get-products-pending-in-cart', httpHeader)
  } 
  // /api/cart/delete-product-pending-in-cart/{cartId}
  deletePendingItemInCart(cartId : number) : Observable<any>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  

    return this.http.delete<any>(this.url + 'api/cart/delete-product-pending-in-cart/' + cartId, httpHeader)
  }

  removeToCart(hardwareStoreId : number, cartId : number, productId : number, branchId : number) : Observable<any>{

    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    
    return this.http.delete<any>(this.url+'api/cart/remove-to-cart/'+hardwareStoreId+'/'+cartId+'/'+productId+'/'+branchId, httpHeader)
  } 

  incrementQuantity(hardwareStoreId : number, cartId : number, productId : number, branchId : number) : Observable<any>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.put<any>(this.url+'api/cart/increment-quantity/'+hardwareStoreId+'/'+cartId+'/'+productId+'/'+branchId, {}, httpHeader)
  } 

  decrementQuantity(hardwareStoreId : number, cartId : number, productId : number, branchId : number) : Observable<any>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.put<any>(this.url+'api/cart/decrement-quantity/'+hardwareStoreId+'/'+cartId+'/'+productId + '/'+branchId, {},httpHeader)
  }
}
