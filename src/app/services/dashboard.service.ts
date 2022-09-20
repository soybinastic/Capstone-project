import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';
@Injectable({
    providedIn : 'root'
})
export class DashboardService{
    private readonly url : string = environment.apiUrl;
    constructor(private client : HttpClient, private accountService : AccountService){}

    public getAll(branchId : number = 0) : Observable<any[]>{
        const httpHeaders = {
            headers : new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this.accountService.getToken())
        }

        return this.client.get<any[]>(this.url + 'api/Dashboard?branchId=' + branchId, httpHeaders);
    }

    public getByBranch(branchId : number) : Observable<any[]>{
        const httpHeaders = {
            headers : new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this.accountService.getToken())
        }

        return this.client.get<any[]>(this.url + 'api/Dashboard/by-branch/' + branchId, httpHeaders);
    }

    public getById(id : number) : Observable<any>{
        const httpHeaders = {
            headers : new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this.accountService.getToken())
        }

        return this.client.get<any>(this.url + 'api/Dashboard/' + id, httpHeaders)
    }

    public updateStatus(dashboardId : number) : Observable<any> {
        const httpHeaders = {
            headers : new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this.accountService.getToken())
        }

        return this.client.put<any>(this.url + 'api/Dashboard/update-status/' + dashboardId, {}, httpHeaders)
    }
}