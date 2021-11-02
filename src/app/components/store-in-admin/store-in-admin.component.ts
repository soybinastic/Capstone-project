import { Component, Input, OnInit } from '@angular/core';
import { IHardwareStore } from 'src/app/models/hardware-store-models/hardwarestore';

@Component({
  selector: 'app-store-in-admin',
  templateUrl: './store-in-admin.component.html',
  styleUrls: ['./store-in-admin.component.css']
})
export class StoreInAdminComponent implements OnInit {
  @Input() hardwareStore : IHardwareStore;
  constructor() { }

  ngOnInit(): void {
  }

}
