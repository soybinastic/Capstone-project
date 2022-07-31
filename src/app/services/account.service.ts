import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogIn } from '../models/accountmodels/login';
import { environment } from 'src/environments/environment';

const httpHeaders = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = environment.apiUrl;
  private token : any;

  constructor(private http : HttpClient) { }

  logIn(model : ILogIn): Observable<any>{
    return this.http.post<any>(this.url+'api/account/login',model, httpHeaders);
  }  
  logOut(tokenParam:any): Observable<any>{
    let httpHeader = {
      headers: new HttpHeaders()
      .set('Authorization' , `Bearer ${tokenParam}`)
    }
    
    return this.http.post<any>(this.url+'api/account/logout',{ },httpHeader)
  }

  setToken(token:string): void{
    localStorage.setItem('user-login',token);
    this.token = localStorage.getItem('user-login')
  } 
  removeToken():void{
    localStorage.removeItem('user-login');
    this.token = '';
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('user-login');
  } 
  getToken(){
    return localStorage.getItem('user-login')
  }
  getUserRole():string{ 
    let authToken : any = this.getToken();
    const userInfo = JSON.parse(atob(authToken.split('.')[1]))
    return userInfo.role;
  } 
  
}
