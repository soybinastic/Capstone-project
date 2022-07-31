import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HardwareStoreUserService {
  private url = environment.apiUrl
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { }

  getUserRoles() : Observable<any>{
    return this.http.get<any>(this.url+'api/hardwarestoreuser/get-roles')
  } 
  addUser(data : any) : Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }

    return this.http.post<any>(this.url+'api/HardwareStoreUser/add-user', data, httpOptions)
  }
  getUsers() : Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    return this.http.get<any>(this.url+'api/HardwareStoreUser/get-users', httpOptions)
  } 
  getUser(userId : number): Observable<any>{
    return this.http.get<any>(this.url+'api/HardwareStoreUser/get-user/'+userId)
  } 
  getUserLogged() : Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<any>(this.url+'api/HardwareStoreUser/user-logged-in-info', httpOptions)
  } 
  getWarehouseAdminInfo() : Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.get<any>(this.url+'api/HardwareStoreUser/get-warehouse-admin-info', httpOptions)
  } 

  getStoreAdminInfo() : Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    // /api/HardwareStoreUser/get-storeadmin-info
    return this.http.get<any>(this.url + 'api/HardwareStoreUser/get-storeadmin-info', httpOptions)
  }
}
