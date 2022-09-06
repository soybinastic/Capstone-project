import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector : 'success-checkout',
    styleUrls : ['./success.component.css'],
    templateUrl : './success.component.html'
})
export class SucessComponent implements OnInit {
    private readonly _route : Router;
    constructor(private route : Router){
        this._route = route;
    }
    ngOnInit(): void {
        
    }
    onNavigate(val : any) : void {
        this._route.navigate(['/branch'])
    }
}