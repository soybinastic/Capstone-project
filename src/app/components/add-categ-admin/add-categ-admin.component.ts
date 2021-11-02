import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateCategory } from 'src/app/models/category-models/createcategory';

@Component({
  selector: 'app-add-categ-admin',
  templateUrl: './add-categ-admin.component.html',
  styleUrls: ['./add-categ-admin.component.css']
})
export class AddCategAdminComponent implements OnInit {

  addCategoryForm : FormGroup
  @Output() addCategEvent : EventEmitter<ICreateCategory> = new EventEmitter();

  constructor(private formBuilder : FormBuilder) {
    this.addCategoryForm = formBuilder.group({
      categoryName : ['',[Validators.required]]
    }) 
    this.addCategoryForm.valueChanges.subscribe();
   }

  ngOnInit(): void {
  } 

  addCategory(){
    if(this.addCategoryForm.valid){
      const addCategory : ICreateCategory = {
        categoryName : this.addCategoryForm.controls['categoryName'].value
      } 
      this.addCategEvent.emit(addCategory)
    }else{
      alert('Invalid')
    }
  }
}
