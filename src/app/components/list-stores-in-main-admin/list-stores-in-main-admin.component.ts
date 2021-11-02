import { Component, OnInit } from '@angular/core';
import { IHardwareStore } from 'src/app/models/hardware-store-models/hardwarestore';
import { HardwareStoreService } from 'src/app/services/hardware-store.service';

@Component({
  selector: 'app-list-stores-in-main-admin',
  templateUrl: './list-stores-in-main-admin.component.html',
  styleUrls: ['./list-stores-in-main-admin.component.css']
})
export class ListStoresInMainAdminComponent implements OnInit {

  stores: IHardwareStore[] = [];
  length: number = 0
  constructor(private hardwareService : HardwareStoreService) { }

  ngOnInit(): void { 
    this.hardwareService.getAllHardwareStores()
    .subscribe((data)=>{
      this.stores = data;
      console.log(this.stores)
    }) 
    
  }

}
