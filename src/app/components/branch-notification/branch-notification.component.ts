import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-branch-notification',
  templateUrl: './branch-notification.component.html',
  styleUrls: ['./branch-notification.component.css']
})
export class BranchNotificationComponent implements OnInit {

  branchNotifications : any[] = []
  constructor(private notificationService : NotificationService, private route : Router) { }

  ngOnInit(): void {
    this.loadBranchNotifications()
  }
  loadBranchNotifications() : void {
    this.notificationService.getBranchNotifications()
      .subscribe((data) => {
        this.branchNotifications = data
        console.log(this.branchNotifications)
      })
  }

  navigate(type : string) : void {
    switch(type){
      case 'OrderStatus' :
        this.route.navigate(['/branch','orders'])
        break;
      case 'DeliverProduct':
        this.route.navigate(['/branch','reports','request','list'])
        break;
      default :
        break;
    }
  }
}
