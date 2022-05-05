import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit {

  branchId : any
  errorMessage : string = ''
  isInputValid : boolean = true
  isCheck : boolean = true
  form : FormGroup;
  constructor(private fb : FormBuilder, private branchService : BranchService, private urlParam : ActivatedRoute) { 
    this.form = fb.group({
      id : ['',Validators.required],
      branchName : ['',Validators.required],
      address : ['', Validators.required],
      isActive : [this.isCheck]
    })
  }

  ngOnInit(): void {
    this.branchId = this.urlParam.snapshot.paramMap.get('branchId')
    this.loadBranchToInput(Number(this.branchId))
  }
  update(){
    if(this.isValid()){
      
      const data = JSON.stringify(this.form.value)
      console.log(data)
      this.updateBranch(data, this.branchId)
    }else{
      this.isInputValid = false
      this.errorMessage = 'Invalid Input.'
    }
  } 
  loadBranchToInput(branchId : number){
    this.branchService.getBranch(branchId)
      .subscribe((data)=>{
        console.log(data)
        this.form.controls['id'].setValue(data.id)
        this.form.controls['branchName'].setValue(data.name)
        this.form.controls['address'].setValue(data.address)
        this.form.controls['isActive'].setValue(data.isActive)
      })
  }
  updateBranch(data : any, branchId : number){
    this.branchService.updateBranch(data, branchId)
    .subscribe((res)=>{
      if(res.success == 1){
        alert(res.message)
        this.isInputValid = true;
        this.errorMessage = ''
      }
    }, (err)=>{
      this.isInputValid = false
      this.errorMessage = JSON.stringify(err).toString();
    })
  }
  onChange(event : any){
    const value = this.form.controls['isActive'].value.toString();
    this.isCheck = value == 'true'
    //this.isCheck = !this.isCheck
    console.log(this.isCheck)
    this.form.controls['isActive'].setValue(this.isCheck);
  }
  isValid():boolean{
    return this.form.controls['branchName'].value?.length > 0 && this.form.controls['address']
    .value?.length > 0;
  }
}
