import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { HardwareStoreService } from 'src/app/services/hardware-store.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  hardwareStoreDetails : any = {}
  warehouseNotificationNumberInfo : any = {}
  constructor(private accountService : AccountService, private hardwareStoreUSerService : HardwareStoreUserService, private hardwareStoreService : HardwareStoreService, 
    private signalRService : SignalrService, private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.signalRService.createConnection()
    
    this.loadUserInfo()
    if(this.getRole() == 'WarehouseAdmin'){
      this.getWarehouseNotificationNumberDetails()
      this.warehouseAdminInfo()
    }
  }
  getRole() : string {
    return this.accountService.getUserRole()
  }
  warehouseAdminInfo(){
    this.hardwareStoreUSerService.getWarehouseAdminInfo()
      .subscribe((data) => {
        const warehouseId : number = Number(data.warehouseId)
        //this.warehouseNotificationNumber(wareh)
        this.signalRService.hubConnectionInstance() 
            .on("RecieveWarehouseNotifs", (data : any) =>{
                if(warehouseId == Number(data.warehouseId)){
                  this.warehouseNotificationNumberInfo = data
                }
            })
        console.log(data)
      })
  } 
  getWarehouseNotificationNumberDetails(){
    this.notificationService.getWarehouseNotificationNumber()
      .subscribe((data) => {
        this.warehouseNotificationNumberInfo = data
        console.log(this.warehouseNotificationNumberInfo)
      })
  } 
  warehouseNotificationNumber(warehouseId : number) : void {
    this.signalRService.hubConnectionInstance() 
      .on("RecieveWarehouseNotifs", (data : any) =>{
          if(warehouseId == Number(data.warehouseId)){
            this.warehouseNotificationNumberInfo = data
          }
      })
  }
  resetNotificationNumber(){
    this.warehouseNotificationNumberInfo = {}
  }
  loadHardwareStoreInfo(hardwareStoreId : number){
    this.hardwareStoreService.getHardwareStoreById(hardwareStoreId)
      .subscribe((data) => {
        this.hardwareStoreDetails = data
        console.log(this.hardwareStoreDetails)
      })
  }
  loadUserInfo(){
    this.hardwareStoreUSerService.getUserLogged()
      .subscribe((data) => {
        this.loadHardwareStoreInfo(Number(data.hardwareStoreId))
      })
  }
}
