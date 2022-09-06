import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard.service";
import { HardwareStoreUserService } from "src/app/services/hardware-store-user.service";

@Component({
    selector : 'bills-summary',
    styleUrls : ['./bills-summary-page.component.css'],
    templateUrl : './bills-summary-page.component.html'
})
export class BillsSummaryComponent implements OnInit{

    url : string;
    dashboards : any[] = []
    private readonly  _hardwareStoreUserService : HardwareStoreUserService;
    private readonly _dashboardService : DashboardService;
    private readonly _route : Router;
    constructor(private hardwareStoreUserService : HardwareStoreUserService, 
        private dashboardService : DashboardService, 
        private route : Router){
            this._hardwareStoreUserService = hardwareStoreUserService;
            this._dashboardService = dashboardService;
            this._route = route;

            this.url = this._route.url
    }
    ngOnInit(): void {
        // throw new Error("Method not implemented.");
        this.loadStoreAdminInfo()
    }

    loadStoreAdminInfo() : void {
        this._hardwareStoreUserService.getStoreAdminInfo()
            .subscribe((data) => {
                this.loadDashboards(Number(data.branchId))
            })
    }

    loadDashboards(branchId : number) : void {
        this._dashboardService.getByBranch(branchId)
            .subscribe((data) => {
                this.dashboards = data;
            });
    }

    checkStatus(dashboard : any) : string{
        const status = dashboard.status;
        switch(status){
            case "PAID":
            return "badge badge-pill badge-success";
            case "ONGOING":
            return "badge badge-pill badge-info";
            case "UNPAID":
            return "badge badge-pill badge-danger";
            default:
            return ""
        }
    }
}