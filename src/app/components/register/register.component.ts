import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegister } from 'src/app/models/customer/register';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    messageError: string;
    isValid: boolean = true;
    registerForm : FormGroup;
    registerBtnText : string = 'Register'
  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private route : Router) {
    this.registerForm = formBuilder.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      // email: ['',[Validators.required,Validators.email]],
      contactNo:['',[Validators.required, Validators.pattern(new RegExp("[0-9]{11}"))]],
      address:['',[Validators.required]],
      userName:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(7)]],
      confirmPassword:['',[Validators.required]]
    }) 
    this.registerForm.valueChanges.subscribe();
   }

  ngOnInit(): void {
  }

  register(){
    if(this.registerForm.valid){
      const contact = this.registerForm.controls['contactNo'].value.toString();
      if(this.registerForm.controls['password'].value != this.registerForm.controls['confirmPassword'].value){
        this.isValid = false;
        this.messageError = "Password and confirm password not matched"
      }else{

        this.registerBtnText = 'Registering...'
        this.isValid = true
        const customer: IRegister = {
          firstName: this.registerForm.controls['firstName'].value,
          lastName: this.registerForm.controls['lastName'].value,
          contactNo: this.registerForm.controls['contactNo'].value.toString(),
          // email: this.registerForm.controls['email'].value,
          address: this.registerForm.controls['address'].value,
          userName: this.registerForm.controls['userName'].value,
          password: this.registerForm.controls['password'].value,
          confirmPassword: this.registerForm.controls['confirmPassword'].value
        }
        

        this.customerService.register(customer)
        .subscribe((res)=>{
          if(res.success == 1){
            this.isValid = true
            this.registerBtnText = 'Register'
            alert(res.messsage)
            this.route.navigate(['/login'])
          }
        },(err)=>{
          this.isValid = false;
          this.messageError = err.error.message
        })
        alert(typeof(customer.contactNo))
        console.log(customer)
      }
    }else{
      if(this.registerForm.controls['contactNo'].invalid){
        this.isValid = false
        this.messageError = 'Contact number must have atleast 11 numbers'
        return;
      }
      this.isValid = false;
      this.messageError = "Please fill up the form completely"
    }
  } 
}
