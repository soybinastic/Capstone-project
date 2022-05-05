import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { HardwareStoreService } from 'src/app/services/hardware-store.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OrderService } from 'src/app/services/order.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  branchNotificationNumberInfo : any = {}
  orderNotifNumber : any = {}
  hardwareStore : any = {}
  constructor(private signalRService : SignalrService, private hardwareStoreUserService : HardwareStoreUserService, private notificationService : NotificationService, private orderService : OrderService, private hardwareStoreService : HardwareStoreService, private accountService : AccountService) { }

  ngOnInit(): void {
    this.signalRService.createConnection()
    

    if(this.getUserRole() == 'StoreAdmin'){
      this.getNotificationNumberInfo()
      this.loadOrderNotifNumber()
      this.storeAdminInfo()
      this.getOrderNotifNumber()
    }

    this.loadHardwareStoreInfo()
    //this.hardwareStoreUser()
    // const sideBar = document.querySelector('.side-bar') as HTMLDivElement
    // window.addEventListener('scroll', ()=>{
    //   if(window.scrollY >= 51.25){
    //     sideBar.classList.add('fix')
    //   }else{
    //     sideBar.classList.remove('fix')
    //   } 
    // })
  }
  getUserRole() : string {
    return this.accountService.getUserRole()
  } 
  loadOrderNotifNumber(){
    this.orderService.getOrderNotifNumber()
      .subscribe((data) => {
        this.orderNotifNumber = data
        console.log(this.orderNotifNumber)
      })
  }
 
  getOrderNotifNumber() : void {
    this.hardwareStoreUserService.getStoreAdminInfo()
      .subscribe((data) => {
        const branchId = Number(data.branchId);
        this.signalRService.hubConnectionInstance()
          .on('RecieveOrderNotif', (data : any) => {
            console.log(data)
            if(branchId === Number(data.branchId)){
              this.orderNotifNumber.numberOfOrderNotif = Number(data.numberOfOrder)
            }
          })
      })
  }
  resetOrderNotif() : void {
    this.orderNotifNumber.numberOfOrderNotif = 0
  }
  storeAdminInfo() : void {
    this.hardwareStoreUserService.getStoreAdminInfo()
      .subscribe((data) => {
        const branchId : number = Number(data.branchId)
        console.log(data)
        this.signalRService.hubConnectionInstance()
          .on('RecieveBranchNotifs', (data : any) => {
              if(branchId == Number(data.branchId)){
                this.branchNotificationNumberInfo = data
              }
          })
      })
  } 
  getNotificationNumberInfo() : void {
    this.notificationService.getBranchNotificationNumber()
      .subscribe((data) => {
        this.branchNotificationNumberInfo = data
      })
  }
  loadHardwareStoreInfo() : void {
    this.hardwareStoreUserService.getUserLogged()
      .subscribe((data) => {
        const hardwareStoreId = Number(data.hardwareStoreId);
        this.hardwareStoreService.getHardwareStoreById(hardwareStoreId)
          .subscribe((data) => {
            console.log('Hardware Store Info')
            this.hardwareStore = data
            console.log(this.hardwareStore)
          })
      })
  }
  hardwareStoreUser() : void {
    this.hardwareStoreUserService.getUserLogged()
      .subscribe((data) => {
        console.log('Hardware store user info')
        console.log(data)
      })
  }
  resetNotifications() : void {
    this.branchNotificationNumberInfo = {}
  }

  userInfo() : void {
    this.hardwareStoreUserService.getUserLogged()
      .subscribe((data) => console.log(data))
  }

}
