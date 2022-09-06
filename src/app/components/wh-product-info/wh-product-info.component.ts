import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductStorageService } from 'src/app/services/product-storage.service';

@Component({
  selector: 'app-wh-product-info',
  templateUrl: './wh-product-info.component.html',
  styleUrls: ['./wh-product-info.component.css']
})
export class WhProductInfoComponent implements OnInit {

  imageFile : File
  imageUrl : string 
  productId : number;
  warehouseId : number;
  inputEnabler : boolean = false;
  productInfoForm : FormGroup;
  checkBoxInput : boolean; 
  uploadBtnIsShow : boolean = false;
  uploadBtnText : string = 'Upload'
  // isValidInput : boolean;
  errorMessage : string = ''
  product : any  = {
    name : "",
    category : '',
    description : '',
    supplier : '',
    stockNumber : '',
    costPrice :'',
    isActive : true,
    addedAt : ''
  } 
  _costPrice : any
  categories : any[] = []
  defaultCategory : any = {}
  constructor(private urlParam : ActivatedRoute, private formBuilder : FormBuilder, 
    private productStorageService : ProductStorageService, private categoryService : CategoryService, private router : Router, private accountService : AccountService) {

    //this.setValues()
    this.productInfoForm = formBuilder.group({
      hardwareStoreId : ['', Validators.required],
      warehouseId : ['', Validators.required],
      itemName : [this.product.name,Validators.required],
      categoryId : [this.product.category,Validators.required],
      description : [this.product.description,Validators.required],
      supplier : [this.product.supplier,Validators.required],
      stockNumber : [Number(this.product.stockNumber),Validators.required],
      initialPrice : [this.product.costPrice,Validators.required],
      isActive : [this.checkBoxInput],
      addedAt : [this.product.addedAt, Validators.required]
    }) 
    this.disableInputs();

  }
  onUpload() : void {
    this.onUploadImage(this.productId, this.getFormData())
  }
  onUploadImage(hardwareProductId : number, data : any) : void {
    this.inputEnabler = false
    this.uploadBtnText = 'Uploading...'
    this.productStorageService.updateProductImage(data, hardwareProductId)
      .subscribe((res) => {
        //alert(res.message)
        console.log(res)
        this.imageUrl = res
        this.inputEnabler = true;
        this.uploadBtnText = 'Upload'
        this.uploadBtnIsShow = false
      }, (err) => {
        alert('Something went wrong') 
      this.inputEnabler = true
      this.uploadBtnText = 'Upload'
    })
  }
  chooseImageFile(event : any) : void {
    let file = <File>event.target.files[0]
    this.imageFile = file
    this.uploadBtnIsShow = true;
    // const data : any = {
    //   hardwareStoreId : this.productInfoForm.controls['hardwareStoreId'].value,
    //   warehouseId : this.productInfoForm.controls['warehouseId'].value,
    //   itemName : this.productInfoForm.controls['itemName'].value,
    //   categoryId : this.productInfoForm.controls['categoryId'].value,
    //   description : this.productInfoForm.controls['description'].value,
    //   supplier : this.productInfoForm.controls['supplier'].value,
    //   stockNumber : this.productInfoForm.controls['stockNumber'].value,
    //   costPrice : this.productInfoForm.controls['costPrice'].value,
    //   isActive : this.productInfoForm.controls['isActive'].value,
    //   addedAt : this.productInfoForm.controls['addedAt'].value,
    //   imageFile : fileName
    // }
    
    // formData.forEach((val, key) => {
    //   console.log(val)
    // })
  }

  getFormData() : FormData {
    const formData = new FormData()
    formData.append('file', this.imageFile, this.imageFile.name)
    return formData;
  }
  disableInputs(){
    this.productInfoForm.controls['addedAt'].disable()
    this.productInfoForm.controls['categoryId'].disable()
    this.productInfoForm.controls['itemName'].disable()
    this.productInfoForm.controls['description'].disable()
    this.productInfoForm.controls['supplier'].disable()
    this.productInfoForm.controls['stockNumber'].disable()
    this.productInfoForm.controls['initialPrice'].disable()
    this.productInfoForm.controls['isActive'].disable()
  }
  onDelete(){
    this.productStorageService.delete(this.warehouseId, this.productId)
    .subscribe((res) => {
      if(res.success == 1){
        alert(res.message)
        this.router.navigate(['/ware-house','warehouse-manage-products'])
      }
    }, (err) => {
      alert(err)
    })
  }
  enableInputs(){
    this.productInfoForm.controls['itemName'].enable()
    this.productInfoForm.controls['description'].enable()
    this.productInfoForm.controls['supplier'].enable()
    this.productInfoForm.controls['stockNumber'].enable()
    this.productInfoForm.controls['initialPrice'].enable()
    this.productInfoForm.controls['isActive'].enable()
    this.productInfoForm.controls['categoryId'].enable()
    this.productInfoForm.controls['addedAt'].enable()
  } 
  inputToggle(isEnable : boolean){
    isEnable ? this.enableInputs() : this.disableInputs();
  } 
  loadCategories(data : any){
    const categoryId = data.hardwareProduct.categoryId;
    this.categoryService.getCategories(Number(data.hardwareProduct.hardwareStoreId))
    .subscribe((data) => {
      console.log(data)
      this.categories = data; 
      this.defaultCategory = this.categories.find(p => p.categoryId == categoryId)
    })
  }
  selectedCategory(event : any){
    const categoryId = event.target.value;
    this.productInfoForm.controls['categoryId'].patchValue(categoryId)
  }

 
  update() : void{
    if(this.isValid()){
      this.errorMessage = '';
      alert(this.productInfoForm.controls['isActive'].value + " - " + this.productInfoForm.controls['itemName'].value) 
      const data = JSON.stringify(this.productInfoForm.value);
      console.log(data)
      console.log('Product Id : ' + this.productId)
      // this.getFormData().forEach((val, key) => {
      //   console.log(key + ' - ' + val)
      // })
      this.onUpdateProduct(data, this.productId)
    }else{
      this.errorMessage = 'Invalid Input.'
    }
  }
  setValues(){ 
    this.product.name = 'Cementoo'
    this.product.description = 'Cement Descriptionssssss'
    this.product.category = 'Concretessasas'
    this.product.addedAt = '1/23/2022'
    this.product.supplier = 'John doe'
    this.product.stockNumber = '200'
    this.product.costPrice = '250.00'
    this.product.isActive = true;
    this.checkBoxInput = this.product.isActive;

    
  }
  isValid() : boolean{
    return this.productInfoForm.valid;
  }
  ngOnInit(): void {
    const urlProductId = Number(this.urlParam.snapshot.paramMap.get('productId'))
    const urlWarehouseId = Number(this.urlParam.snapshot.paramMap.get('warehouseId'))

    this.productId = urlProductId; 
    this.warehouseId = urlWarehouseId;

    this.loadProduct(urlProductId, urlWarehouseId)
    //this.setValues()
  } 
  onUpdateProduct(data : any, productId : number){
    this.productStorageService.update(data, productId)
    .subscribe((res) => {
      if(res.success == 1){
        alert(res.message)
      }
    }, (err) => {
      alert('Something went wrong.')
    })
  }
  loadProduct(productId : number, warehouseId : number){
    this.productStorageService.getProduct(warehouseId, productId)
    .subscribe((data) => {
      this.productInfoForm.controls['hardwareStoreId'].setValue(data.hardwareProduct.hardwareStoreId)
      this.productInfoForm.controls['warehouseId'].setValue(data.warehouseId)
      this.initializeData(data) 
      this.loadCategories(data)
      console.log(data)
      this.imageUrl = data.hardwareProduct.imageFile
    })
  } 
  initializeData(data : any){
    this._costPrice = data.hardwareProduct.costPrice;
    this.productInfoForm.controls['itemName'].patchValue(data.hardwareProduct.name)
    this.productInfoForm.controls['categoryId'].patchValue(data.hardwareProduct.categoryId)
    this.productInfoForm.controls['description'].patchValue(data.hardwareProduct.description)
    this.productInfoForm.controls['supplier'].patchValue(data.hardwareProduct.supplier)
    this.productInfoForm.controls['initialPrice'].patchValue(data.hardwareProduct.initialPrice)
    //this.productInfoForm.controls['isActive'].patchValue(Boolean(data.isActive))
    this.productInfoForm.controls['addedAt'].patchValue(this.toDate(data.addedAt).toISOString().slice(0, -1))
    this.productInfoForm.controls['stockNumber'].patchValue(Number(data.stockNumber))
    this.checkBoxInput = this.isActive(data.isActive)
    this.productInfoForm.controls['isActive'].setValue(this.checkBoxInput)
  } 
  toDate(strDate : string) : Date{
    let date = new Date(strDate);
    return date;
  }
  isActive(isActive : any) : boolean{
    return isActive.toString() == "true";
  }
  enableToggle():void{
    this.inputEnabler = !this.inputEnabler;
    this.inputToggle(this.inputEnabler)
  }
  isChecked() {
    this.checkBoxInput = !this.checkBoxInput;
    this.productInfoForm.controls['isActive'].setValue(this.checkBoxInput)
  } 

  getRole() : string{
    return this.accountService.getUserRole();
  }
}
