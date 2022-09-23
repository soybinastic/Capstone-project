import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../models/order-models/order';
import { IOrderDetails } from '../models/order-models/orderdetails';
import { IOrderNotifNumber } from '../models/order-models/ordernotificationnumber';
import { IOrderProduct } from '../models/order-models/orderproducts';
import { IPostOrder } from '../models/order-models/postorder';
import { IUpdateOrder } from '../models/order-models/updateorder';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = environment.apiUrl
  // private url = "https://localhost:44367/";
  constructor(private http: HttpClient, private accountService: AccountService) { } 

  getAllOrders():Observable<IOrder[]>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<IOrder[]>(this.url+'api/order/get-orders',httpHeaders)
  } 
  getOrderDetails(orderId:number):Observable<IOrderDetails>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<IOrderDetails>(this.url+'api/order/get-customer-details/'+orderId, httpHeaders)
  } 

  getOrderNotifNumber() : Observable<IOrderNotifNumber>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    return this.http.get<IOrderNotifNumber>(this.url+'api/order/get-order-notif-number',httpHeaders);
  } 
  getOrderProducts(orderId: number):Observable<IOrderProduct[]>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<IOrderProduct[]>(this.url+'api/order/get-order-products/'+orderId,httpHeaders)
  }

  getOrder(orderId : number) : Observable<any> {
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    return this.http.get<any>(this.url + 'api/order/get-order/' + orderId, httpHeaders)
  }
 
  postOrder(order : any) : Observable<any>{
    const httpHeader = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }

    return this.http.post(this.url+'api/order/post-order',order, httpHeader)
  } 
  updateOrder(orderId: number, orderUpdate: IUpdateOrder): Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  

    return this.http.put<any>(this.url+'api/order/update-order/'+orderId,orderUpdate,httpHeaders)
  }

  getCompletedOrders() : Observable<any[]> {
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<any[]>(this.url + 'api/Order/get-completed-orders', httpHeaders)
  } 

  getCompletedOrder(orderId : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    return this.http.get<any>(this.url + 'api/Order/get-completed-order/' + orderId, httpHeaders)
  }

  approveOrder(orderId : number, salesClerkId : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }

    return this.http.put<any>(this.url + 'api/Order/approve-order/' + orderId + '/' + salesClerkId, {}, httpHeaders)
  }
  confirmOrder(orderId : number) : Observable<any>{
    
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }

    return this.http.put<any>(this.url + 'api/Order/confirm-order/' + orderId, {}, httpHeaders)
  }

  salesClerks() : Observable<any[]>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    return this.http.get<any[]>(this.url + 'api/Order/sales-clerks', httpHeaders);
  }

  toDeliver(orderId : number) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    return this.http.put<any>(this.url + 'api/Order/to-deliver/' + orderId, {}, httpHeaders)
  }

  getPreparations() : Observable<any[]>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    return this.http.get<any[]>(this.url + 'api/Order/preparations', httpHeaders);
  }
}
