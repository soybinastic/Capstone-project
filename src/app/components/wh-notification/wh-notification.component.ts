import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-wh-notification',
  templateUrl: './wh-notification.component.html',
  styleUrls: ['./wh-notification.component.css']
})
export class WhNotificationComponent implements OnInit {

  warehouseNotifications : any[] = []
  constructor(private notificationService : NotificationService, private route : Router) { }

  ngOnInit(): void {
    this.loadWarehouseNotifications()
  }

  loadWarehouseNotifications() : void {
    this.notificationService.getWarehouseNotifications()
      .subscribe((data) => {
        this.warehouseNotifications = data
        console.log(this.warehouseNotifications)
      })
  }

  navigate(type : string) : void {
    switch(type){
      case 'Request' :
        this.route.navigate(['/ware-house','reports','branch-requests'])
        break
      default:
        break
    }
  }
}
