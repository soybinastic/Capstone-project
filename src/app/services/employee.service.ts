import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AccountService } from "./account.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private url: string = environment.apiUrl;
    constructor(private client: HttpClient, private accountService: AccountService) { }

    register(employee: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this.accountService.getToken())
        }
        return this.client.post<any>(this.url + "api/Employee", employee, httpOptions);
    }

    getAll(): Observable<any[]> {
        const httpOptions = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this.accountService.getToken())
        }

        return this.client.get<any[]>(this.url + "api/Employee", httpOptions);
    }
}