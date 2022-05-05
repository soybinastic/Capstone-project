import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateCategory } from 'src/app/models/category-models/createcategory';
import { CategoryService } from 'src/app/services/category.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';

@Component({
  selector: 'app-wh-product-categories',
  templateUrl: './wh-product-categories.component.html',
  styleUrls: ['./wh-product-categories.component.css']
})
export class WhProductCategoriesComponent implements OnInit {

  categories : any[] = []
  form : FormGroup
  constructor(private hardwareStoreUserService : HardwareStoreUserService, private categoryService : CategoryService, private fb : FormBuilder) { 
    this.form = fb.group({
      categoryName : ['',Validators.required]
    })
  }
  createCategory() {
    if(this.isValid()){
      const category : ICreateCategory = {
        categoryName : this.form.controls['categoryName'].value
      } 
      this.onAdd(category)
    }else{
      alert('Please fill it correctly.')
    }
  } 
  onAdd(data : ICreateCategory){
    this.categoryService.createCategory(data)
      .subscribe((res) => {
        alert(res.message)
        this.loadUserInfo()
      }, (err) => {
        alert('Something went wrong.')
      })
  }
  isValid() : boolean {
    return this.form.valid
  }
  ngOnInit(): void {
    this.loadUserInfo()
  } 
  loadUserInfo(){
    this.hardwareStoreUserService.getUserLogged()
      .subscribe((data) => {
        console.log(data)
        this.loadCategories(Number(data.hardwareStoreId))
      })
  }
  loadCategories(hardwareStoreId : number){
    this.categoryService.getCategories(hardwareStoreId)
      .subscribe((data) => {
        this.categories = data 
        console.log(this.categories)
      })
  }
}
