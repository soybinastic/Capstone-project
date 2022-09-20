import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHardwareStore } from 'src/app/models/hardware-store-models/hardwarestore';
import { BranchService } from 'src/app/services/branch.service';
import { ControlService } from 'src/app/services/control.service';
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
  km : number = 5
  isBtnDisable : boolean
  message : string = "Please wait..."
  loading : boolean

  constructor(private hardwareStoreService : HardwareStoreService, private signalRService : SignalrService,
     private route : Router, private branchService : BranchService, 
     private activatedRoute : ActivatedRoute, private controlService : ControlService) {
        this.customerLat = Number(localStorage.getItem("customer_lat"));
        this.customerLng = Number(localStorage.getItem("customer_lng")); 
      }

  ngOnInit(): void { 
    // this.signalRService.createConnection();
    // this.hardwareStoreService.getAllHardwareStores()
    // .subscribe((data)=>{
    //   this.hardwareStores = data 
    //   this.signalRService.hardwareStoreStatus(this.hardwareStores)
    //   console.log(this.hardwareStores)
    // })
    this.activatedRoute.queryParamMap.subscribe(param => {
      console.log(param.get('km'))
      if(param.get('km') !== null){
        this.km = Number(param.get('km'))
        this.loadAllBranches(this.customerLat, this.customerLng, this.km)
      }else{
        this.loadAllBranches(this.customerLat, this.customerLng);
      }
      console.log(this.km)
    })

    this.controlService.onSearch()
      .subscribe((value) => {
          this.branchService.search(value, this.customerLat, this.customerLng, this.km)
            .subscribe((data) => {
                this.branches = data;
            })
      })
    
  } 

  go(hardwareStore : any){
    // this.route.navigate(['/hardware-store-page/'+hardwareStore.hardwareStoreId])
    this.route.navigate(['/store', hardwareStore.id, hardwareStore.hardwareStoreId, 'products', hardwareStore.id])
  }

  loadAllBranches(lat : number = 0, lng : number = 0, km = 5) : void{
    this.isBtnDisable = true;
    this.loading = true;
    this.branchService.getAllBranches(lat, lng, km)
      .subscribe(data => {
        this.branches = data;
        this.isBtnDisable = false
        this.loading = false
        this.message = data.length === 0 ? 'No stores found' : 'Please wait...'
        console.log(this.branches)
      })
  }
  increment() : void {
    this.route.navigate(['/stores'], { queryParams : { km : this.km + 1 } })
  } 
  decrement() : void {
    if(this.km > 1){
      this.route.navigate(['/stores'], { queryParams : { km : this.km - 1 } })
    }
  }
}
