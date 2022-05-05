import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  errorMessage : string = ''
  isInputValid : boolean = true
  isCheck : boolean = true
  form : FormGroup;
  constructor(private fb : FormBuilder, private branchService : BranchService) { 
    this.form = fb.group({
      branchName : ['',Validators.required],
      address : ['', Validators.required],
      isActive : [this.isCheck]
    })
  }

  ngOnInit(): void {
  }
  add(){
    if(this.isValid()){
      
      const data = JSON.stringify(this.form.value)
      console.log(data)
      this.addBranch(data)
    }else{
      this.isInputValid = false
      this.errorMessage = 'Invalid Input.'
    }
  } 
  addBranch(data : any){
    this.branchService.addBranch(data)
    .subscribe((res)=>{
      if(res.success == 1){
        alert(res.message)
        this.isInputValid = true;
        this.errorMessage = ''
      }
    }, (err)=>{
      this.isInputValid = false
      this.errorMessage = 'Something went wrong please try again.'
    })
  }
  onChange(event : any){
    this.isCheck = !this.isCheck
    console.log(this.isCheck)
    this.form.controls['isActive'].setValue(this.isCheck);
  }
  isValid():boolean{
    return this.form.controls['branchName'].value?.length > 0 && this.form.controls['address']
    .value?.length > 0;
  }
}
