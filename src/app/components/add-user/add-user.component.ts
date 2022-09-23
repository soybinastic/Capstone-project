import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from 'src/app/services/branch.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm : FormGroup;
  errorMessage : string = '';
  isValidInput : boolean = true;
  userRoles : any[] = []
  warehouses : any[] = []
  branches : any[] = []
  constructor(private formBuilder : FormBuilder, private hardwareStoreUserService : HardwareStoreUserService, private warehouseService : WarehouseService, private branchService : BranchService) {
    this.addUserForm = formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['',Validators.required],
      userName : ['', Validators.required],
      role : ['',Validators.required],
      password : ['',Validators.required],
      confirmPassword : ['', Validators.required],
      branchId : [''],
      warehouseId : [''],
      userFrom : ['',Validators.required]
    })
    this.addUserForm.controls['branchId'].disable()
    this.addUserForm.controls['warehouseId'].disable()
   }
  ngOnInit(): void {
    this.loadUserRoles()
    this.loadWarehouses();
    this.loadBranches()
  }
  loadBranches(){
    this.branchService.getBranches()
    .subscribe((data)=>{
      this.branches = data
      console.log(this.branches)
    })
  }
  loadUserRoles(){
    this.hardwareStoreUserService.getUserRoles()
    .subscribe((data)=> {
      this.userRoles = data;
      this.userRoles = this.userRoles.filter(r => r.name != 'Customer' &&  r.name != 'StoreOwner' && r.name != 'Admin');
      console.log(this.userRoles)
    })
  }
  loadWarehouses(){
    this.warehouseService.getWarehouses()
    .subscribe((data)=>{
      this.warehouses = data
      console.log(this.warehouses)
    })
  }
  onSelectWarehouse(event : any){
    const warehouseId = event.target.value.toString()
    const warehouse = this.warehouses.find(w=>w.id == Number(warehouseId))
    this.setUserFrom(warehouse)
  } 
  setUserFrom(data : any){
    //const obj = JSON.stringify(data)
    this.addUserForm.controls['userFrom'].patchValue(data.name);
    console.log(data)
  } 
  onSelectBranch(event : any){
    const branchId = event.target.value.toString();
    const branch = this.branches.find(b=>b.id == Number(branchId))
    this.setUserFrom(branch)
  }
  onSelect(event : any){
    
    const roleName = event.target.value.toString();
    this.addUserForm.controls['branchId'].setValidators([Validators.required])
    this.addUserForm.controls['warehouseId'].setValidators([Validators.required])
    if(roleName == 'TransportAgent' || roleName == 'StoreAdmin' || roleName == 'Cashier' || roleName == 'SalesClerk'){
      this.addUserForm.controls['branchId'].enable()
      this.addUserForm.controls['warehouseId'].clearValidators()
      this.addUserForm.controls['warehouseId'].disable()
      
    }else if(roleName == "SuperAdmin"){
      this.addUserForm.controls['branchId'].disable()
      this.addUserForm.controls['warehouseId'].disable()
      this.addUserForm.controls['warehouseId'].clearValidators()
      this.addUserForm.controls['branchId'].clearValidators()
      this.addUserForm.controls['userFrom'].patchValue('Store');
    }else if(roleName == "WarehouseAdmin"){
      this.addUserForm.controls['branchId'].disable()
      this.addUserForm.controls['warehouseId'].enable()
      this.addUserForm.controls['branchId'].clearValidators()
    }else{
      this.addUserForm.controls['branchId'].disable()
      this.addUserForm.controls['warehouseId'].disable()
    }
  }
  isValid() : boolean{
    return this.isPasswordValid() && this.addUserForm.valid
  } 
  
  isPasswordValid() : boolean{
    
    if(this.addUserForm.controls['password'].value?.length > 7){
      if(this.addUserForm.controls['password'].value === this.addUserForm.controls['confirmPassword'].value){
        this.errorMessage = ''
        return true;
      }else{
        this.errorMessage = 'Password and confirm password not matched!'
        return false
      } 
    }else{
      this.errorMessage = 'Password must have 8 or more characters.'
      return false;
    }
  } 
  clearInputs() :void{
    this.addUserForm.controls['firstName'].setValue('')
    this.addUserForm.controls['lastName'].setValue('')
    this.addUserForm.controls['email'].setValue('')
    this.addUserForm.controls['userName'].setValue('')
    this.addUserForm.controls['role'].setValue('') 
    this.addUserForm.controls['password'].setValue('')
    this.addUserForm.controls['confirmPassword'].setValue('')
    this.addUserForm.controls['branchId'].setValue('')
    this.addUserForm.controls['warehouseId'].setValue('')
    this.addUserForm.controls['userFrom'].setValue('')
  }
  disableInput(){
    this.addUserForm.controls['branchId'].disable()
    this.addUserForm.controls['warehouseId'].disable()
  }
  addHardwareStoreUser(data : any){
    this.hardwareStoreUserService.addUser(data)
    .subscribe((res)=>{
      if(res.success == 1){
        this.isValidInput = true;
        this.errorMessage = '';
        this.disableInput()
        this.clearInputs();
        alert(res.message)
      }
    },(err)=>{
      this.isValidInput = false;
      this.errorMessage = 'Something went wrong';
      console.log(err)
    })
  }
  addUser() : void{
    if(this.isValid()){
      this.isValidInput = true
      const data = JSON.stringify(this.addUserForm.value)
      this.addHardwareStoreUser(data)
    }else{
      this.isValidInput = false;
      this.errorMessage = this.errorMessage !== '' ? this.errorMessage : 'Invalid Input.'
    }
  }
}
