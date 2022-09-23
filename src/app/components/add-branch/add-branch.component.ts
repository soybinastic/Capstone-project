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
  imageFile : File
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
      this.addBranch(this.createFormData())
    }else{
      this.isInputValid = false
      this.errorMessage = 'Invalid Input.'
    }
  } 
  createFormData() : FormData {

    const formData = new FormData();
    formData.append('branchName', this.form.controls['branchName'].value);
    formData.append('address', this.form.controls['address'].value);
    formData.append('isActive', this.form.controls['isActive'].value);
    if(this.imageFile != null){
      formData.append('image', this.imageFile, this.imageFile.name);
    }
    return formData;
  }
  selectedImageFile(event : any) : void {
    let file = <File>event.target.files[0];
    this.imageFile = file;
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
