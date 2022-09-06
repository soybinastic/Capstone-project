import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector : 'bill-status',
    styleUrls : ['./bill-status.component.css'],
    templateUrl : './bill-status.component.html'
})
export class BillStatusComponent {
    
    @Input()
    dashboard : any

    @Input()
    isShow : boolean

    @Input()
    viewIsShow : boolean

    @Output()
    onClickEvent : EventEmitter<any> = new EventEmitter();

    selectedOption : string = "1"

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

    showSalesOfMonthToggle(event : any) : void {
        const val = event.target.value;
        this.selectedOption = val;
    }

    onClick() : void {
        this.onClickEvent.emit(this.dashboard);
    }
}