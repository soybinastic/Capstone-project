import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector : 'cancel-checkout',
    styleUrls : ['./cancel.component.css'],
    templateUrl : './cancel.component.html'
})
export class CancelComponent implements OnInit {

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
