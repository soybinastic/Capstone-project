import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHardwareStore } from '../models/hardware-store-models/hardwarestore';
import { IRegisterHardware } from '../models/hardware-store-models/registerhardwarestore';
import { AccountService } from './account.service';
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
export class HardwareStoreService {
  private url = environment.apiUrl
  // private url = "https://localhost:44367/";

  constructor(private http: HttpClient, private accountService: AccountService) { }  

  getAllHardwareStores():Observable<IHardwareStore[]>{
    return this.http.get<IHardwareStore[]>(this.url+'api/hardwarestore/get-hardware-stores', httpHeaders)
  } 
  registerHardware(hardware: IRegisterHardware): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.post<any>(this.url+'api/admin/register-hardware-store',hardware,httpOptions)
  } 
  getHardwareStoreInfo() : Observable<IHardwareStore>{
    const httpOptions = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    }  

    return this.http.get<IHardwareStore>(this.url+'api/hardwarestore/get-hardwarestore-info', httpOptions)
  } 
  getHardwareStoreById(hardwareStoreId:number): Observable<IHardwareStore>{
    const httpOptions = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
    }  

    return this.http.get<IHardwareStore>(this.url+'api/hardwarestore/get-hardwarestore/'+hardwareStoreId, httpOptions)
  }
}
