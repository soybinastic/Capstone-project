import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUpdateProduct } from 'src/app/models/product-models/updateproduct';

@Component({
  selector: 'app-update-product-admin',
  templateUrl: './update-product-admin.component.html',
  styleUrls: ['./update-product-admin.component.css']
})
export class UpdateProductAdminComponent implements OnInit {
  @Input() updateProductInput : IUpdateProduct 
  @Output() updateEvent : EventEmitter<IUpdateProduct> = new EventEmitter() 

  isValid : boolean = true
  message : string 
  showForm : boolean;
  disabled : boolean = true
  updateProductForm : FormGroup
  constructor() { }

  ngOnInit(): void {
    
  } 
  showFormToggle(){
    this.showForm = !this.showForm
    this.getValue()
  }
  onUpdateProduct(){
    if(this.updateProductForm.valid){
      const product : IUpdateProduct = {
        productId : this.updateProductInput.productId,
        categoryId: this.updateProductInput.categoryId,
        name : this.updateProductForm.controls['name'].value,
        price: this.updateProductForm.controls['price'].value,
        description: this.updateProductForm.controls['description'].value,
        brand : this.updateProductForm.controls['brand'].value,
        quality : this.updateProductForm.controls['quality'].value,
        stockNumber : this.updateProductForm.controls['stockNumber'].value
      } 
      this.updateEvent.emit(product)
      this.isValid = true
    }else{
      this.isValid = false
      this.message = 'Invalid'
    }
    
  }
  getValue(){
    this.updateProductForm = new FormGroup({
      name: new FormControl(this.updateProductInput.name,[Validators.required]),
      price: new FormControl(this.updateProductInput.price,[Validators.required,Validators.min(0)]),
      description: new FormControl(this.updateProductInput.description,[Validators.required]),
      brand : new FormControl(this.updateProductInput.brand,[Validators.required]),
      quality: new FormControl(this.updateProductInput.quality,[Validators.required]),
      stockNumber: new FormControl(this.updateProductInput.stockNumber,[Validators.required,Validators.min(0)])
    })
    // this.updateProductForm.controls['name'].setValue(this.updateProductInput.name)
    // this.updateProductForm.controls['description'].setValue(this.updateProductInput.description)
    // this.updateProductForm.controls['price'].setValue(this.updateProductInput.price)
    // this.updateProductForm.controls['brand'].setValue(this.updateProductInput.brand)
    // this.updateProductForm.controls['quality'].setValue(this.updateProductInput.quality)
    // this.updateProductForm.controls['stockNumber'].setValue(this.updateProductInput.stockNumber)
  }
}
