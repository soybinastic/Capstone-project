import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-branch-orders',
  templateUrl: './branch-orders.component.html',
  styleUrls: ['./branch-orders.component.css']
})
export class BranchOrdersComponent implements OnInit {

  constructor(private accountService : AccountService) { }

  ngOnInit(): void {
  }
  getRole() : string {
    return this.accountService.getUserRole()
  }
}
