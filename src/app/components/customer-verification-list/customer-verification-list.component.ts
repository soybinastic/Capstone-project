import { Component, OnInit } from '@angular/core';
import { CustomerVerificationService } from 'src/app/services/customer-verification.service';

@Component({
  selector: 'app-customer-verification-list',
  templateUrl: './customer-verification-list.component.html',
  styleUrls: ['./customer-verification-list.component.css']
})
export class CustomerVerificationListComponent implements OnInit {

  userVerificationDetails : any[] = []
  message : string = 'Loading...'
  constructor(private customerVerificationService : CustomerVerificationService) { }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() : void {
    this.customerVerificationService.getAll()
      .subscribe((data) => {
        this.userVerificationDetails = data
        console.log(this.userVerificationDetails)
      })
  }
}
