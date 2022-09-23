import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private url = environment.apiUrl;
  //private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { }

  addBranch(data : any) : Observable<any>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    return this.http.post<any>(this.url+'api/Branch/add-branch', data, httpHeader)
  }
  
  getAllBranches(lat : number = 0, lng : number = 0, km : number = 5) : Observable<any[]>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('lat', lat.toString())
      .set('lng', lng.toString())
    }

    return this.http.get<any[]>(this.url + 'api/Branch/all-branches?adjusted_km=' + km, httpHeader);
  }

  search(value : string, lat : number = 0, lng : number = 0, km : number = 5) : Observable<any[]> {
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('lat', lat.toString())
      .set('lng', lng.toString())
    }

    return this.http.get<any[]>(this.url + 'api/Branch/search?search=' + value + '&adjusted_km=' + km, httpHeader);
  }

  getBranches(): Observable<any[]>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    return this.http.get<any[]>(this.url+'api/Branch/get-branches', httpHeader)
  }
  getBranchesByHardwareStoreId(hardwareStoreId : number) : Observable<any[]>{
    return this.http.get<any[]>(this.url+'api/Branch/get-branches/'+hardwareStoreId)
  } 
  updateBranch(data : any, branchId : number) : Observable<any>{
    const httpHeader = {
      headers : new HttpHeaders()
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 
    return this.http.put<any>(this.url+'api/Branch/update-branch/'+branchId, data, httpHeader);
  } 
  getBranch(branchId : number) : Observable<any>{
    return this.http.get<any>(this.url+'api/Branch/get-branch/'+branchId);
  }
}
