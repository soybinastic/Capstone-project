import { Component, OnInit } from '@angular/core';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : any[] = []
  constructor(private hardwareStoreUserService : HardwareStoreUserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(){
    this.hardwareStoreUserService.getUsers()
    .subscribe((data)=>{
      this.users = data
      console.log(this.users)
    })
  }
}
