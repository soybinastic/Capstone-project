import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class ControlService {
    private subject : Subject<string> = new Subject();

    search(value : string) : void {
        this.subject.next(value);
    }

    onSearch() : Observable<string> {
        return this.subject.asObservable();
    }
}