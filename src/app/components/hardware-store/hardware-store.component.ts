import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHardwareStore } from 'src/app/models/hardware-store-models/hardwarestore';

@Component({
  selector: 'app-hardware-store',
  templateUrl: './hardware-store.component.html',
  styleUrls: ['./hardware-store.component.css']
})
export class HardwareStoreComponent implements OnInit {

  @Input() hardwareStore : IHardwareStore
  @Output() goEvent : EventEmitter<IHardwareStore> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  go(hardwareStore : IHardwareStore){
    this.goEvent.emit(hardwareStore)
  }

}
