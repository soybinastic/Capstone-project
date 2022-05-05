import { Component, OnInit } from '@angular/core';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { HardwareStoreService } from 'src/app/services/hardware-store.service';

@Component({
  selector: 'app-wh-main-page',
  templateUrl: './wh-main-page.component.html',
  styleUrls: ['./wh-main-page.component.css']
})
export class WhMainPageComponent implements OnInit {

  currentDate : Date = new Date()
  storeDetails : any = {}
  constructor(private hardwareStoreUserService : HardwareStoreUserService, private hardwareStoreService : HardwareStoreService) { }

  ngOnInit(): void {
    this.laodUserDetails()
  }
  laodUserDetails(){
    this.hardwareStoreUserService.getUserLogged()
    .subscribe((data) => {
      this.loadStoreDetails(Number(data.hardwareStoreId))
      console.log(data)
    })
  } 
  loadStoreDetails(hardwareStoreId : number){
    this.hardwareStoreService.getHardwareStoreById(hardwareStoreId)
    .subscribe((data) => {
      this.storeDetails = data
      console.log(this.storeDetails)
    })
  }
}
