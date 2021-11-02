import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHardwareStore } from 'src/app/models/hardware-store-models/hardwarestore';
import { HardwareStoreService } from 'src/app/services/hardware-store.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-hardware-stores',
  templateUrl: './hardware-stores.component.html',
  styleUrls: ['./hardware-stores.component.css']
})
export class HardwareStoresComponent implements OnInit {
  hardwareStores: IHardwareStore[] = []
  constructor(private hardwareStoreService : HardwareStoreService, private signalRService : SignalrService, private route : Router) { }

  ngOnInit(): void { 
    this.signalRService.createConnection();
    this.hardwareStoreService.getAllHardwareStores()
    .subscribe((data)=>{
      this.hardwareStores = data 
      this.signalRService.hardwareStoreStatus(this.hardwareStores)
      console.log(this.hardwareStores)
    })
  } 

  go(hardwareStore : IHardwareStore){
    this.route.navigate(['/hardware-store-page/'+hardwareStore.hardwareStoreId])
  }

}
