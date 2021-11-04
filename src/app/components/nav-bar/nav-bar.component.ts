import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrderNotifNumber } from 'src/app/models/order-models/ordernotificationnumber';
import { AccountService } from 'src/app/services/account.service';
import { OrderService } from 'src/app/services/order.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  selected : string;
  role : any
  @Input() orderNotif: IOrderNotifNumber
  @Output() menuEvent : EventEmitter<string> = new EventEmitter()
  constructor(private accountService : AccountService) { }

  ngOnInit(): void { 
    this.role = this.accountService.getUserRole();
  }
  selectMenu(val:string){
    this.selected = val; 
    this.menuEvent.emit(val)
  }
}
