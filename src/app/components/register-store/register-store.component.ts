import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IRegisterHardware } from 'src/app/models/hardware-store-models/registerhardwarestore';
import { CompanyRegisteredService } from 'src/app/services/company-registered.service';
import { HardwareStoreService } from 'src/app/services/hardware-store.service';
@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.css']
})
export class RegisterStoreComponent implements OnInit {
  isValid: boolean = true;
  message: string
  registerForm : FormGroup; 
  private readonly _companyRegisteredService : CompanyRegisteredService;

  constructor(private formBuilder: FormBuilder, 
    private hardwareService: HardwareStoreService, private route : ActivatedRoute,
    private companyRegisteredService : CompanyRegisteredService) { 
    this.registerForm = formBuilder.group({
      firstName:['',[Validators.required]],
      lastName: ['',[Validators.required]],
      userName:['',[Validators.required]],
      hardwareStoreName:['',[Validators.required]],
      owner: ['',[Validators.required]],
      businessAddress: ['',[Validators.required]],
      contactNo: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]], 
      password: ['',[Validators.required,Validators.minLength(7)]],
      confirmPassword:['',[Validators.required]]
    }) 
    this.registerForm.valueChanges.subscribe();
    this._companyRegisteredService = companyRegisteredService;
  }

  ngOnInit(): void {
    const detailId = this.route.snapshot.queryParamMap.get("detail_id");
    console.log(detailId === null);
    if(detailId !== null){
      this.loadDetails(Number(detailId));
    }
  }
  loadDetails(id : number){
    this._companyRegisteredService.get(id)
      .subscribe((data) => {
        console.log(data)
        this.setData(data)
      })
  }
  setData(data : any){
    this.registerForm.controls["firstName"].setValue(data.firstName);
    this.registerForm.controls["lastName"].setValue(data.lastName);
    this.registerForm.controls["owner"].setValue(data.firstName + " " + data.lastName);
    this.registerForm.controls["hardwareStoreName"].setValue(data.companyName);
    this.registerForm.controls["contactNo"].setValue(data.phoneNumber);
    this.registerForm.controls["email"].setValue(data.emailAddress);
    this.registerForm.controls["businessAddress"].setValue(data.address);
  }
  register() : void{
    
    if(this.registerForm.valid){
      
      if(this.registerForm.controls['password'].value != this.registerForm.controls['confirmPassword'].value){
        this.isValid = false;
        this.message = 'Password and confirm password not matched.'
      }else{
        this.isValid = true;
        const hardware:IRegisterHardware ={
          firstName: this.registerForm.controls['firstName'].value,
          lastName: this.registerForm.controls['lastName'].value,
          userName: this.registerForm.controls['userName'].value,
          owner: this.registerForm.controls['owner'].value,
          businessAddress: this.registerForm.controls['businessAddress'].value,
          hardwareStoreName: this.registerForm.controls['hardwareStoreName'].value,
          email: this.registerForm.controls['email'].value,
          contactNo: this.registerForm.controls['contactNo'].value,
          password: this.registerForm.controls['password'].value,
          confirmPassword: this.registerForm.controls['confirmPassword'].value
        } 
        console.log(hardware) 
        this.hardwareService.registerHardware(hardware)
        .subscribe((res)=>{
          if(res.success == 1){
            alert(res.message)
            this.clear()
          }
        }, (err)=>{
          console.log(err)
        })
      }
    }else{
      this.isValid = false;
      this.message = 'Please fill up the form correctly.'
    }
  } 
  clear(){
    this.registerForm.controls['firstName'].setValue('')
    this.registerForm.controls['lastName'].setValue('')
    this.registerForm.controls['userName'].setValue('')
    this.registerForm.controls['owner'].setValue('')
    this.registerForm.controls['businessAddress'].setValue('')
    this.registerForm.controls['hardwareStoreName'].setValue('')
    this.registerForm.controls['email'].setValue('')
    this.registerForm.controls['contactNo'].setValue('')
    this.registerForm.controls['password'].setValue('')
    this.registerForm.controls['confirmPassword'].setValue('')
  }
}