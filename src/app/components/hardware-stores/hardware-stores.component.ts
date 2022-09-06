import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHardwareStore } from 'src/app/models/hardware-store-models/hardwarestore';
import { BranchService } from 'src/app/services/branch.service';
import { HardwareStoreService } from 'src/app/services/hardware-store.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-hardware-stores',
  templateUrl: './hardware-stores.component.html',
  styleUrls: ['./hardware-stores.component.css']
})
export class HardwareStoresComponent implements OnInit {
  branches : any[] = []
  hardwareStores: IHardwareStore[] = []
  customerLat : number
  customerLng : number
  constructor(private hardwareStoreService : HardwareStoreService, private signalRService : SignalrService,
     private route : Router, private branchService : BranchService) {
        this.customerLat = Number(localStorage.getItem("customer_lat"));
        this.customerLng = Number(localStorage.getItem("customer_lng"));
      }

  ngOnInit(): void { 
    this.signalRService.createConnection();
    this.hardwareStoreService.getAllHardwareStores()
    .subscribe((data)=>{
      this.hardwareStores = data 
      this.signalRService.hardwareStoreStatus(this.hardwareStores)
      console.log(this.hardwareStores)
    })

    this.loadAllBranches(this.customerLat, this.customerLng);
  } 

  go(hardwareStore : any){
    // this.route.navigate(['/hardware-store-page/'+hardwareStore.hardwareStoreId])
    this.route.navigate(['/store', hardwareStore.id, hardwareStore.hardwareStoreId, 'products', hardwareStore.id])
  }

  loadAllBranches(lat : number = 0, lng : number = 0) : void{
    this.branchService.getAllBranches(lat, lng)
      .subscribe(data => {
        this.branches = data;
      })
  } 

}
