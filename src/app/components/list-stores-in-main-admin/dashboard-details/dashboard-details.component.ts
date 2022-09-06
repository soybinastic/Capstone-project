import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
    selector : 'dashboard-details',
    styleUrls : ['./dashboard-details.component.css'],
    templateUrl : './dashboard-details.component.html'
})
export class DashboardDetailsComponent implements OnInit{

    _route : ActivatedRoute
    _dashboardService : DashboardService
    dashboard : any
    dashboards : any[] = []
    constructor(private route : ActivatedRoute , private dashboardService : DashboardService){
        this._route = route;
        this._dashboardService = dashboardService;
    }

    ngOnInit(): void {
        // throw new Error("Method not implemented.");
        const id : number = Number(this._route.snapshot.paramMap.get('id'))
        const branchId : number = Number(this._route.snapshot.paramMap.get('branchId'))
        console.log(id + " - " + branchId)
        this.loadDetails(id)
        this.loadDashboards(branchId)
    }

    loadDetails(id : number) : void {
        this._dashboardService.getById(id)
            .subscribe((data) => {
                this.dashboard = data
                console.log(this.dashboard)
            })
    }

    loadDashboards(branchId : number) : void {
        this._dashboardService.getByBranch(branchId)
            .subscribe((data) => {
                this.dashboards = data;
                console.log(this.dashboards)
            })
    }

}