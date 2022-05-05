import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerVerificationService } from 'src/app/services/customer-verification.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-verification-form',
  templateUrl: './customer-verification-form.component.html',
  styleUrls: ['./customer-verification-form.component.css']
})
export class CustomerVerificationFormComponent implements OnInit {

  customer : any = {}
  isDialogShow : boolean = false
  btnText : string = 'Verify'
  isBtnEnabled : boolean = true
  nbiImageFile : File
  brgyClearanceImageFile : File
  governmentIdImageFile : File;
  bankStatementImageFile : File;

  form : FormGroup
  constructor(private fb : FormBuilder, private customerVerificationService : CustomerVerificationService, private customerService : CustomerService) { 
    this.form = fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      middleName : ['', Validators.required],
      address : ['', Validators.required],
      birthDate : ['', Validators.required],
      age : ['', Validators.required],
      nbi : [this.nbiImageFile, Validators.required],
      barangayClearance : [this.brgyClearanceImageFile, Validators.required],
      governmentId : [this.governmentIdImageFile, Validators.required],
      bankStatement : [this.bankStatementImageFile]
    })
  }

  ngOnInit(): void {
    this.loadCustomer()
    //this.disableInput()
  }
  setValue(data : any) {
    this.form.controls['firstName'].setValue(data.firstName)
    this.form.controls['lastName'].setValue(data.lastName)
    this.form.controls['address'].setValue(data.address)
    this.form.controls['middleName'].setValue(data.middleName)
    this.form.controls['age'].setValue((data.age == 0 ? '' : data.age))
    this.form.controls['birthDate'].setValue(data.birthDate)
  }
  disableInput() : void {
    this.form.controls['firstName'].disable()
    this.form.controls['lastName'].disable()
    this.form.controls['address'].disable()
    this.form.controls['middleName'].disable()
    this.form.controls['age'].disable()
    this.form.controls['birthDate'].disable()
  }
  loadCustomer() : void {
    this.customerService.getCustomerInfo()
      .subscribe((data) => {
        this.customer = data
        console.log(this.customer)
        this.setValue(this.customer)
      })
  }
  submit() : void {
    if(this.form.valid){
      const data = JSON.stringify(this.form.value)
      console.log(data)
      const formData = new FormData()
      formData.append('firstName', this.form.controls['firstName'].value)
      formData.append('lastName', this.form.controls['lastName'].value)
      formData.append('middleName', this.form.controls['middleName'].value)
      formData.append('address', this.form.controls['address'].value)
      formData.append('birthDate', this.form.controls['birthDate'].value)
      formData.append('age', this.form.controls['age'].value)
      formData.append('nbi', this.nbiImageFile, this.nbiImageFile.name)
      formData.append('barangayClearance', this.brgyClearanceImageFile, this.brgyClearanceImageFile.name)
      formData.append('governmentId', this.governmentIdImageFile, this.governmentIdImageFile.name)
      if(this.bankStatementImageFile != null){
        formData.append('bankStatement', this.bankStatementImageFile, this.bankStatementImageFile.name)
      }


      this.onPost(formData)
      // formData.forEach((data) => {
      //   console.log(data)
      // })
    }
  } 
  onPost(data : any) : void {
    this.isBtnEnabled = false
    this.btnText = 'Verifying...'
    this.customerVerificationService.post(data)
      .subscribe((res) => {
        alert(res.message)
        this.btnText = 'Posted'
        this.isDialogShow = true
      }, (err) => {
        alert(err.error.message)
        console.log(err)
      })
  }
  setAge(event : any) : void {
    
    try{
      const age = Number(event.target.value)
      if(age > 0){
        this.form.controls['age'].setValue(age)
      }else{
        this.form.controls['age'].setValue('')
      }
    }catch(e){
      this.form.controls['age'].setValue('')
    }
  }
  setBankStatementFile(event: any): void {
    const file = <File>event.target.files[0];
    this.bankStatementImageFile = file
    this.form.controls['bankStatement'].setValue(this.bankStatementImageFile)
  }
  setGovernmentIdFile(event: any): void {
    const file = <File>event.target.files[0];
    this.governmentIdImageFile = file
    this.form.controls['governmentId'].setValue(this.governmentIdImageFile)
  }
  setBrgyClearanceFile(event: any): void {
    const file = <File>event.target.files[0];
    this.brgyClearanceImageFile = file
    this.form.controls['barangayClearance'].setValue(this.brgyClearanceImageFile)
  }
  setNbiFile(event : any) : void {
    const file = <File>event.target.files[0];
    this.nbiImageFile = file
    this.form.controls['nbi'].setValue(this.nbiImageFile)
  }
  isGovernmentIdInvalid(): boolean {
    return (this.form.controls['governmentId'].invalid && (this.form.controls['governmentId'].pristine || this.form.controls['governmentId'].touched))
  }
  isBarangayClearanceInvalid(): boolean {
    return (this.form.controls['barangayClearance'].invalid && (this.form.controls['barangayClearance'].pristine || this.form.controls['barangayClearance'].touched))
  }
  isNbiInvalid(): boolean {
    return (this.form.controls['nbi'].invalid && (this.form.controls['nbi'].pristine || this.form.controls['nbi'].touched))
  }
  isAgeInvalid(): boolean {
    return (this.form.controls['age'].invalid && (this.form.controls['age'].pristine || this.form.controls['age'].touched))
  }
  isBirthDateInvalid(): boolean {
    return (this.form.controls['birthDate'].invalid && (this.form.controls['birthDate'].pristine || this.form.controls['birthDate'].touched))
  }
  isAddressInvalid(): boolean {
    return (this.form.controls['address'].invalid && (this.form.controls['address'].pristine || this.form.controls['address'].touched))
  }
  isMiddleNameInvalid(): boolean {
    return (this.form.controls['middleName'].invalid && (this.form.controls['middleName'].pristine || this.form.controls['middleName'].touched))
  }
  isLastNameInvalid(): boolean {
    return (this.form.controls['lastName'].invalid && (this.form.controls['lastName'].pristine || this.form.controls['lastName'].touched))
  }
  isFirstNameInvalid() : boolean {
    return (this.form.controls['firstName'].invalid && (this.form.controls['firstName'].pristine || this.form.controls['firstName'].touched))
  }
}

