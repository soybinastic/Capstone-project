import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userId : any
  user : any = {}
  constructor(private hardwareStoreUserService : HardwareStoreUserService, 
    private urlParam : ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.urlParam.snapshot.paramMap.get('userId')
    this.loadUser()
  } 
  loadUser(){
    this.hardwareStoreUserService.getUser(Number(this.userId))
    .subscribe((data)=>{
      this.user = data;
      console.log(this.user)
    })
  }

}
