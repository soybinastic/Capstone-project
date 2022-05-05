import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { ProductStorageService } from 'src/app/services/product-storage.service';
import { RecieveProductService } from 'src/app/services/recieve-product.service';

@Component({
  selector: 'app-wh-add-recieved-products',
  templateUrl: './wh-add-recieved-products.component.html',
  styleUrls: ['./wh-add-recieved-products.component.css']
})
export class WhAddRecievedProductsComponent implements OnInit {

  recievedProducts : any[] = [] 
  products : any[] = []
  productNames : any[] = []
  isValid : boolean = true;
  errorMessage : string = ''
  form : FormGroup;
  constructor(private fb : FormBuilder, private productStorageService : ProductStorageService, private hardwareStoreUserService : HardwareStoreUserService, private recieveProductService : RecieveProductService) { 
    this.form = fb.group({
      description : [''],
      hardwareProductId : ['',Validators.required],
      costPrice : ['',Validators.required],
      quantity : ['',Validators.required]
    }) 
    
  }
  loadProducts(warehouseId : number){
    this.productStorageService.getProducts(warehouseId)
    .subscribe((data) => {
      this.products = data
      console.log(this.products)
    })
  } 
  warehouseAdminInfo(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
    .subscribe((data) => {
      this.loadProducts(Number(data.warehouseId))
    })
  }
  ngOnInit(): void { 
    this.getRecievedProductsInLocalStorage()
    this.warehouseAdminInfo()
  } 

  getRecievedProductsInLocalStorage(){
    if(!!localStorage.getItem('recievedProducts')){
      let products = JSON.parse(JSON.stringify(localStorage.getItem("recievedProducts")));
      this.recievedProducts = JSON.parse(products)
      console.log(this.recievedProducts)
    }
  }
  selectProduct(event : any){
    const hardwareProductId : number = Number(event.target.value)
    const product : any = this.products.find(p => p.hardwareProductId == hardwareProductId)
    this.form.controls['costPrice'].setValue(product.hardwareProduct.costPrice)
  }
  clearInputs(){
    this.form.controls['hardwareProductId'].setValue('')
    this.form.controls['costPrice'].setValue('')
    this.form.controls['quantity'].setValue('')
  }
  addToList(){
    this.form.controls['description'].clearValidators()
    this.isValid = true
    if(this.isValidInput()){
      const data : any = {
        hardwareProductId : this.form.controls['hardwareProductId'].value,
        productName : this.setProductName(Number(this.form.controls['hardwareProductId'].value)),
        costPrice : this.form.controls['costPrice'].value,
        quantity : this.form.controls['quantity'].value
      } 
  
      this.recievedProducts.push(data)
      //TODO : impelement display productNames
      //this.productNames.push(this.setProductName(Number(this.form.controls['hardwareProductId'].value))) 
      this.setDataToLocalStorage()
      console.log(this.recievedProducts)
      this.clearInputs()
    }else{
      this.isValid = false
      this.errorMessage = 'Invalid Input'
    }
  } 
  setProductName(hardwareProductId : number) : string{
    const product = this.products.find(p => p.hardwareProductId == hardwareProductId)
    return product.hardwareProduct.name;
  }
  setDataToLocalStorage(){
    localStorage.setItem('recievedProducts', JSON.stringify(this.recievedProducts))
  } 
  removeToList(index : number){
    
    this.recievedProducts = this.recievedProducts.filter((val, i) => i != index); 
    //this.productNames = this.productNames.filter((val, i) => i != index)
    this.setDataToLocalStorage();
    
    if(this.recievedProducts.length == 0){
      localStorage.removeItem('recievedProducts');
    }
  } 
  isValidInput() : boolean{
    return this.form.valid;
  } 
  onAttach(){

    this.isValid = true
    if(this.form.controls['description'].value == ''){
      this.isValid = false;
      this.errorMessage = 'Please put a description to describe this report'
    }else{
      const data : any = {
        reportDetail : {
          description : this.form.controls['description'].value,
          reportType : 'RecieveProductReport'
        },
        recieveProducts : this.recievedProducts
      } 
  
      console.log(data) 
      this.addReport(JSON.stringify(data))
    }
  } 
  addReport(data : any){
    this.recieveProductService.add(data)
      .subscribe((res) => {
        if(res.success == 1){
          alert(res.message)
          this.recievedProducts = []
          localStorage.removeItem('recievedProducts'); 
        }
      }, (err) => {
        alert('Something went wrong.')
      })
  }
}
