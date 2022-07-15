import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyRegisteredService } from 'src/app/services/company-registered.service';

@Component({
  selector: 'app-store-registration-form',
  templateUrl: './store-registration-form.component.html',
  styleUrls: ['./store-registration-form.component.css']
})
export class StoreRegistrationFormComponent implements OnInit {

  isAcceptedTermsAndConditions : boolean = false
  btnText : string = 'Submit'
  form : FormGroup;
  constructor(private fb : FormBuilder, private companyRegisterService : CompanyRegisteredService) {
    //this.formInit()
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      businessPermit: [this.businessPermitImageFile, Validators.required]
    })
   }

  ngOnInit(): void {
  }
  setPrivacy(event : any) : void {
    this.isAcceptedTermsAndConditions = !this.isAcceptedTermsAndConditions
  }
  businessPermitImageFile : File
  formInit() : void {
    this.form = this.fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      companyName : ['', Validators.required],
      address : ['', Validators.required],
      zip : ['', Validators.required],
      country : ['', Validators.required],
      region : ['', Validators.required],
      phoneNumber : ['', Validators.required],
      email : ['', Validators.email, Validators.required],
      businessPermit : [this.businessPermitImageFile, Validators.required]
    })
  }
  selectedFile(event : any) : void {
    const file = <File>event.target.files[0];
    this.businessPermitImageFile = file
    this.form.controls['businessPermit'].setValue(this.businessPermitImageFile)
  }
  businessPermitIsValid(): boolean {
    return (this.form.controls['businessPermit'].invalid && (this.form.controls['businessPermit'].pristine || this.form.controls['businessPermit'].touched))
  }
  emailIsValid(): boolean {
    return (this.form.controls['email'].invalid && (this.form.controls['email'].pristine || this.form.controls['email'].touched))
  }
  phoneNumberIsValid(): boolean {
    return (this.form.controls['phoneNumber'].invalid && (this.form.controls['phoneNumber'].pristine || this.form.controls['phoneNumber'].touched))
  }
  regionIsValid(): boolean {
    return (this.form.controls['region'].invalid && (this.form.controls['region'].pristine || this.form.controls['region'].touched))
  }
  countryIsValid(): boolean {
    return (this.form.controls['country'].invalid && (this.form.controls['country'].pristine || this.form.controls['country'].touched))
  }
  zipIsValid(): boolean {
    return (this.form.controls['zip'].invalid && (this.form.controls['zip'].pristine || this.form.controls['zip'].touched))
  }
  addressIsValid(): boolean {
    return (this.form.controls['address'].invalid && (this.form.controls['address'].pristine || this.form.controls['address'].touched))
  }
  
  companyNameIsValid(): boolean {
    return (this.form.controls['companyName'].invalid && (this.form.controls['companyName'].pristine || this.form.controls['companyName'].touched))
  }
  lastNameIsValid(): boolean {
    return (this.form.controls['lastName'].invalid && (this.form.controls['lastName'].pristine || this.form.controls['lastName'].touched))
  }
  firstNameIsValid() : boolean {
    return (this.form.controls['firstName'].invalid && (this.form.controls['firstName'].pristine || this.form.controls['firstName'].touched))
  }

  open() : void {
    window.open('http://localhost:4200/privacy-and-termcoditions')
  }
  onRegister(data : any) : void {
    this.btnText = 'Registering...'
    this.companyRegisterService.register(data)
      .subscribe((res) => {
        alert(res.message)
        this.btnText = 'Processing...'
      }, (err) => {
        alert('Something went wrong.')
      })
  }
  register() : void {
    if(this.form.valid && this.isAcceptedTermsAndConditions){
      const formData = new FormData();
      formData.append('firstName', this.form.controls['firstName'].value)
      formData.append('lastName', this.form.controls['lastName'].value)
      formData.append('companyName', this.form.controls['companyName'].value)
      formData.append('address', this.form.controls['address'].value)
      formData.append('zip', this.form.controls['zip'].value)
      formData.append('country', this.form.controls['country'].value)
      formData.append('region', this.form.controls['region'].value)
      formData.append('phoneNumber', this.form.controls['phoneNumber'].value)
      formData.append('emailAddress', this.form.controls['email'].value)
      formData.append('businessPermitImageFile', this.businessPermitImageFile, this.businessPermitImageFile.name)

      this.onRegister(formData)
      // const register = new RegisterModel();
      // register.firstName = this.form.controls['firstName'].value
      // register.lastName = this.form.controls['lastName'].value
      // register.companyName = this.form.controls['companyName'].value
      // register.address = this.form.controls['address'].value
      // register.zip = this.form.controls['zip'].value
      // register.country = this.form.controls['country'].value
      // register.region = this.form.controls['region'].value
      // register.phoneNumber = this.form.controls['phoneNumber'].value
      // register.emailAddress = this.form.controls['email'].value
      // register.businessPermitImageFile = this.businessPermitImageFile

      //console.log(register)
    }
  }
}
export class RegisterModel{
  firstName : string;
  lastName : string;
  companyName : string;
  address : string;
  zip : string;
  country : string;
  region : string;
  phoneNumber : string;
  emailAddress : string;
  businessPermitImageFile : File
}
