import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector : 'alert-dialog',
    styleUrls : ['./alert-dialog.component.css'],
    templateUrl : './alert-dialog.component.html'
})
export class AlertDialogComponent {
    @Input()
    props : any = {
        title : 'Alert Dialog',
        message : 'Thankyou for trusting our company!',
        icon : '',
        btnClass : 'btn btn-success pl-5 pr-5',
        disable : false
    } 
    @Output()
    clickEvent : EventEmitter<any> = new EventEmitter();

    onClick() : void {
        this.clickEvent.emit();
    }
}