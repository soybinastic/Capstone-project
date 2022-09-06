import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHardwareStore } from 'src/app/models/hardware-store-models/hardwarestore';

@Component({
  selector: 'app-hardware-store',
  templateUrl: './hardware-store.component.html',
  styleUrls: ['./hardware-store.component.css']
})
export class HardwareStoreComponent implements OnInit {

  @Input() hardwareStore : any
  @Output() goEvent : EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  go(hardwareStore : any){
    this.goEvent.emit(hardwareStore)
  }

}
