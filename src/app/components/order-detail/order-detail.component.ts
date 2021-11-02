import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrderDetails } from 'src/app/models/order-models/orderdetails';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  @Input() orderDetail : IOrderDetails
  @Input() total: number;
  @Output() backEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  close(){
    this.backEvent.emit()
  }
}
