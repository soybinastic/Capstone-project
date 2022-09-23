import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/services/order.service";

@Component({
    selector : 'orders-to-prepare',
    styleUrls : ['./branch-order-preparation.component.css'],
    templateUrl : './branch-order-preparation.component.html'
})
export class BranchOrderPreparationComponent implements OnInit {
    ordersToPrepare : any[] = []
    message : string = "Loading"
    constructor(private orderService : OrderService){}
    ngOnInit(): void {
        this.loadOrdersToPrepare();
    }

    loadOrdersToPrepare() : void {
        this.orderService.getPreparations()
            .subscribe(data => {
                this.ordersToPrepare = data;
                this.message = this.ordersToPrepare.length == 0 ? "No orders to be prepare" : "";
                console.log(this.ordersToPrepare)
            }, err => {
                this.message = "Somthing went wrong"
            })
    }
}
