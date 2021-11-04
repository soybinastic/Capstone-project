import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddTrasportAgent } from 'src/app/models/transport-agent/addtransportagent';

@Component({
  selector: 'app-add-transport-agt',
  templateUrl: './add-transport-agt.component.html',
  styleUrls: ['./add-transport-agt.component.css']
})
export class AddTransportAgtComponent implements OnInit {

  transportAgentForm : FormGroup; 
  @Input() message : string; 
  @Input() isValid : boolean = true;
  @Input() btnText : string;
  @Output() transportAgent : EventEmitter<IAddTrasportAgent> = new EventEmitter();
  constructor(private formBuilder : FormBuilder) { 
    this.transportAgentForm = formBuilder.group({
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      userName : ['',[Validators.required]],
      password : ['',[Validators.required, Validators.minLength(7)]],
      confirmPassword : ['',[Validators.required,Validators.minLength(7)]]
    }) 
    this.transportAgentForm.valueChanges.subscribe();
  }

  ngOnInit(): void {
  } 

  add(){ 
    //this.isValid = true;
    if(this.transportAgentForm.valid && this.transportAgentForm.controls['password'].value.toString() == this.transportAgentForm.controls['confirmPassword'].value.toString()){

      const addTransportAgent : IAddTrasportAgent = {
        firstName : this.transportAgentForm.controls['firstName'].value.toString(),
        lastName : this.transportAgentForm.controls['lastName'].value.toString(),
        userName : this.transportAgentForm.controls['userName'].value.toString(),
        password : this.transportAgentForm.controls['password'].value.toString(),
        confirmPassword : this.transportAgentForm.controls['confirmPassword'].value.toString()
      } 
      this.transportAgent.emit(addTransportAgent)
      
    }else{ 
      this.isValid = false
      this.message = this.transportAgentForm.controls['password'].value.toString() != this.transportAgentForm.controls['confirmPassword'].value.toString() ? 'Password and Confirm password not match' : (this.transportAgentForm.controls['password'].value.toString().length < 7) ? 'Password must have 7 or more characters' : 'Invalid Input';
    }
  }

}
