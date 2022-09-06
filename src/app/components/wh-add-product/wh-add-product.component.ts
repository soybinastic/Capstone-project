import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { CategoryService } from 'src/app/services/category.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service'; 
import { ProductStorageService } from 'src/app/services/product-storage.service';
import { WarehouseService } from 'src/app/services/warehouse.service'

@Component({
  selector: 'app-wh-add-product',
  templateUrl: './wh-add-product.component.html',
  styleUrls: ['./wh-add-product.component.css']
})
export class WhAddProductComponent implements OnInit {

  errorMessage : string = ''
  form : FormGroup
  isValid : boolean = true 
  isActive : boolean = false 
  userInfo : any = {}
  categories : any[] = [] 
  warehouses : any[] = []
  selectedCategoryName : string = 'Nothing'

  constructor(private fb : FormBuilder, private hardwareStoreUserService : HardwareStoreUserService, private categoryService : CategoryService, private accountService : AccountService, private warehouseService : WarehouseService, private productStorageService : ProductStorageService) { 
    this.form = fb.group({ 
      warehouseId : ['',Validators.required],
      hardwareStoreId : ['',Validators.required],
      itemName : ['', Validators.required],
      categoryId : ['', Validators.required],
      description : ['',Validators.required],
      supplier : ['',Validators.required],
      stockNumber : ['',Validators.required],
      initialPrice : ['',Validators.required],
      isActive : [this.isActive]
    })
  }

  loadProductCategories(hardwareStoreId : number){
    console.log('hardware id: '+ hardwareStoreId) 
    this.categoryService.getCategories(hardwareStoreId)
    .subscribe((data)=>{
      this.categories = data
      console.log(this.categories)
    })
  } 
  selectedWarehouse(event : any){
    const warehouseId = event.target.value; 
    this.form.controls['warehouseId'].setValue(warehouseId) 
    console.log(this.warehouses.find(w => w.id == warehouseId))
  }
  loadWarehouses() {
    this.warehouseService.getWarehouses()
    .subscribe((data) => {
      this.warehouses = data;
      console.log(this.warehouses)
    })
  } 
  getRole() : string{
    const role = this.accountService.getUserRole()
    return role;
  }
  ngOnInit(): void {
    this.userLogged()  
    
    console.log('User Role - ' + this.getRole()) 

    //TODO : getting warehouse info when user logged is warehouse admin.
    if(this.getRole() == "WarehouseAdmin"){
      this.loadWarehouseAdminInfo();
    }else{
      this.loadWarehouses();
    }
  } 
  loadWarehouseAdminInfo(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
    .subscribe((data) => {
      console.log('Warehouse Id : ' + data.warehouseId) 
      this.form.controls['warehouseId'].setValue(data.warehouseId); 
    })
  } 
  userLogged(){
    this.hardwareStoreUserService.getUserLogged()
    .subscribe((data)=>{
      this.userInfo = data;
      console.log(this.userInfo)  
      this.form.controls['hardwareStoreId'].setValue(this.userInfo.hardwareStoreId);

      this.loadProductCategories(Number(this.userInfo.hardwareStoreId))
    })
  }
  add(){
    this.isValid = true;
    this.errorMessage = ''
    if(this.isValidInput()){
      const data = JSON.stringify(this.form.value)
      console.log(data) 
      this.onAddProduct(data);
    }else{
      this.isValid = false;
      this.errorMessage = 'Invalid Input'
    }
  }
  categorySelected(event : any){
    alert(event.target.value) 
    const categoryId = Number(event.target.value)
    const category = this.categories.find(c => c.categoryId == categoryId) 
    this.selectedCategoryName = category.categoryName
  }
  isValidInput(): boolean{
    return this.form.valid;
  }
  isChecked(){
    this.isActive = !this.isActive;
    this.form.controls['isActive'].setValue(this.isActive)
  } 

  onAddProduct(data : any){
    this.productStorageService.add(data)
    .subscribe((res) => {
      if(res.success == 1){
        alert(res.message);
      }
    }, (err) => {
      this.isValid = false;
      this.errorMessage = 'Something went wrong.'
    })
  }
}
