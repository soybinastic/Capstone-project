import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private url = environment.apiUrl;
  // private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { }

  addWarehouse(data : any): Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    return this.http.post<any>(this.url+'api/Warehouse/add-warehouse', data, httpOptions);
  }
  getWarehouses() : Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }
    return this.http.get<any>(this.url+'api/Warehouse/get-warehouses', httpOptions)
  }
}
