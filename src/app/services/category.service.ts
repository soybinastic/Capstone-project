import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category-models/category';
import { ICreateCategory } from '../models/category-models/createcategory';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = environment.apiUrl;
  //private url = "https://localhost:44367/";
  constructor(private http : HttpClient, private accountService : AccountService) { } 

  createCategory(createCat : ICreateCategory) : Observable<any>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization','Bearer '+this.accountService.getToken())
    } 

    return this.http.post<any>(this.url+'api/category/create-category',createCat,httpHeaders)
  } 

  getCategories(hardwareStoreId : number) : Observable<ICategory[]>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
    } 

    return this.http.get<ICategory[]>(this.url+'api/category/get-categories/'+hardwareStoreId, httpHeaders)
  }

  getCategory(hardwareStoreId: number, categoryId: number) : Observable<ICategory>{
    const httpHeaders = {
      headers: new HttpHeaders()
      .set('Content-Type','application/json')
    } 
    
    return this.http.get<ICategory>(this.url+'api/category/get-category/'+hardwareStoreId+'/'+categoryId, httpHeaders)
  }
}
