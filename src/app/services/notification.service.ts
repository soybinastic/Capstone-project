import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = environment.apiUrl
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { } 

  getWarehouseNotificationNumber() : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }

    return this.http.get<any>(this.url + 'api/Notification/get-warehouse-notif-number', httpOptions)
  } 

  getWarehouseNotifications() : Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    return this.http.get<any[]>(this.url + 'api/Notification/get-warehouse-notifs', httpOptions)
  }

  getBranchNotifications() : Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    return this.http.get<any[]>(this.url + 'api/Notification/get-branch-notifs', httpOptions)
  }

  getBranchNotificationNumber() : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }

    return this.http.get<any>(this.url + 'api/Notification/get-branch-notif-number', httpOptions)
  } 
}
