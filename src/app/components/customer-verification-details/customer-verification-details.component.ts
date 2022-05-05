import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerVerificationService } from 'src/app/services/customer-verification.service';

@Component({
  selector: 'app-customer-verification-details',
  templateUrl: './customer-verification-details.component.html',
  styleUrls: ['./customer-verification-details.component.css']
})
export class CustomerVerificationDetailsComponent implements OnInit {
  isContentShow : boolean = false;
  message : string = 'Loading...'
  verfiyBtnText : string = 'Verify'
  
  details : any = {}
  constructor(private customerVerificationService : CustomerVerificationService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.loadData(id)
  }
  loadData(id : number) : void {
    this.customerVerificationService.get(id)
      .subscribe((data) => {
        this.details = data
        console.log(this.details)
        this.isContentShow = true
      }, (err) => {
        this.message = 'Something went wrong.'
      })
  }

  onViewImage(imgFile : string) : void{
    if(imgFile !== ""){
      window.open('https://localhost:44367/' + imgFile)
    }
  }
  onVerifyUser(customerId : any) : void{
    const customer_id = Number(customerId)
    this.verfiyBtnText = 'Verifying...'

    console.log(customer_id)
    this.customerVerificationService.verify(customer_id)
      .subscribe((res) => {
        this.details.customer.isVerified = true
        alert(res.message)
      })
  }
}
