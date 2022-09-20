import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "src/app/services/dashboard.service";
import { PaymentService } from "src/app/services/payment.service";

@Component({
    selector : 'bill-details-page',
    styleUrls : ['./bill-details-page.component.css'],
    templateUrl : './bill-details-page.component.html'
})
export class BillDetailsPageComponent implements OnInit{

    branchId : number
    dashboard : any;
    dashboards : any[] = []
    prevUrl : string | null
    private readonly _route : ActivatedRoute;
    private readonly _dashboardService : DashboardService;
    private readonly _paymentService : PaymentService;
    constructor(private route : ActivatedRoute, private dashboardService : DashboardService, private paymentService : PaymentService){
        this._route = route;
        this._dashboardService = dashboardService;
        this._paymentService = paymentService;
    }
    ngOnInit(): void {
        const dashboardId = this._route.snapshot.paramMap.get('dashboardId');
        const queryStringBranchId = this._route.snapshot.queryParamMap.get('bid')
        this.branchId = queryStringBranchId ? Number(queryStringBranchId) : 0;
        this.prevUrl = this._route.snapshot.queryParamMap.get('prev_url');

        console.log('Dashboard Id: ' + dashboardId + ' Branch Id: ' + this.branchId);
        console.log(this.prevUrl);
        this.loadDashboardById(Number(dashboardId));
        this.loadBranchDashboards()
    }

    loadDashboardById(dashboardId : number): void{
        this._dashboardService.getById(dashboardId)
            .subscribe(data => {
                this.dashboard = data;
                console.log(this.dashboard)
            });
    }

    loadBranchDashboards() : void {
        if(this.branchId > 0){
            this._dashboardService.getAll(this.branchId)
                .subscribe(data => {
                    this.dashboards = data;
                    console.log(this.dashboards)
                })
        }
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

    onClick() : void {
        this._paymentService.checkOut(Number(this.dashboard.id), "http://localhost:4200/success/" + this.dashboard.id, "http://localhost:4200/cancel")
            .subscribe(res => {
                window.location.href = res.url;
            }, err => {
                alert('Something went wrong!')
                console.log(err)
            })
        
    }

}