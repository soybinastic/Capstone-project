import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css']
})
export class CustomerInformationComponent implements OnInit {

  customer : any = {}
  form : FormGroup
  btnText : string = 'Update'
  constructor(private fb : FormBuilder, private customerService : CustomerService) {
    this.form = fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      address : ['', Validators.required],
      contactNo : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(12)]],
      middleName : ['', Validators.required],
      age : ['', Validators.required],
      birthDate : ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.form.disable()
    this.loadCustomer()
  }

  loadCustomer() : void {
    this.customerService.getCustomerInfo()
      .subscribe((data) => {
        this.customer = data
        console.log(this.customer)
        this.setValue(this.customer)
      })
  }
  
  toggle(){
    this.form.disabled ? this.form.enable() : this.form.disable()
  }

  submit() : void {
    if(this.form.valid){
      const data = JSON.stringify(this.form.value)
      console.log(data)
      this.onUpdate(data)
    }
  }
  onUpdate(data : any) : void {
    this.btnText = 'Updating...'
    this.customerService.update(data)
      .subscribe((res) => {
        alert(res.message)
        this.btnText = 'Update'
      }, (err) =>  {
        alert('Failed to update')
        console.log(err)
      })
  }
  setValue(customer : any) : void {
    this.form.controls['firstName'].setValue(customer.firstName)
    this.form.controls['lastName'].setValue(customer.lastName)
    this.form.controls['address'].setValue(customer.address)
    this.form.controls['contactNo'].setValue(customer.contactNo)
    this.form.controls['middleName'].setValue(customer.middleName)
    this.form.controls['age'].setValue(customer.age)
    this.form.controls['birthDate'].setValue(customer.birthDate)
  }
}
