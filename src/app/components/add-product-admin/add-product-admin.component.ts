import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/category-models/category';
import { IAddProduct } from 'src/app/models/product-models/addproduct';

@Component({
  selector: 'app-add-product-admin',
  templateUrl: './add-product-admin.component.html',
  styleUrls: ['./add-product-admin.component.css']
})
export class AddProductAdminComponent implements OnInit {

  @Input() categories : ICategory[] = []
  @Output() addProductEvent : EventEmitter<IAddProduct> = new EventEmitter()
  
  isValid : boolean = true
  message: string
  productForm : FormGroup
  constructor(private formBuilder : FormBuilder) {
    this.productForm = formBuilder.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]],
      category :['',[Validators.required]],
      quality: ['',[Validators.required]],
      brand:['',[Validators.required]],
      price:['',[Validators.required]],
      stockNumber:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
  }
  addProduct(){
    if(this.productForm.valid){
      const product : IAddProduct = {
        name: this.productForm.controls['name'].value,
        categoryId : this.productForm.controls['category'].value,
        description : this.productForm.controls['description'].value,
        quality: this.productForm.controls['quality'].value,
        brand : this.productForm.controls['brand'].value,
        price: this.productForm.controls['price'].value,
        stockNumber : this.productForm.controls['stockNumber'].value
      } 
      this.isValid = true
      this.addProductEvent.emit(product)
    }else{
      this.isValid = false;
      this.message = 'Please fill the form completely'
    }
  }
  selectedValue(){
    alert(this.productForm.controls['category'].value)
  }
}
