import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
    selector : 'success-checkout',
    styleUrls : ['./success.component.css'],
    templateUrl : './success.component.html'
})
export class SucessComponent implements OnInit {
    private readonly _route : Router;
    private readonly _activatedRoute : ActivatedRoute;
    private readonly _dashboardService : DashboardService;
    disable : boolean = true;
    constructor(private route : Router, private activatedRoute : ActivatedRoute,
        private dashboardService : DashboardService){
        this._route = route;
        this._activatedRoute = activatedRoute;
        this._dashboardService = dashboardService;
    }
    ngOnInit(): void {
        const dashboardId : number = Number(this._activatedRoute.snapshot.paramMap.get('dashboardId'))
        this._dashboardService.updateStatus(dashboardId)
            .subscribe(res => {
                this.disable = false;
            }, err => {
                alert('Something went wrong')
            })
    }
    onNavigate(val : any) : void {
        this._route.navigate(['/branch'])
    }
}