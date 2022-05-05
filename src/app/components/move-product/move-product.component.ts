import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { MoveProductService } from 'src/app/services/move-product.service';
import { ProductStorageService } from 'src/app/services/product-storage.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-move-product',
  templateUrl: './move-product.component.html',
  styleUrls: ['./move-product.component.css']
})
export class MoveProductComponent implements OnInit {

  errorMessage : string = ''
  isValid : boolean = true;
  warehouses : any[] = []
  product : any = {}
  form : FormGroup;
  constructor(private fb : FormBuilder, private warehouseService : WarehouseService, 
    private urlParam : ActivatedRoute, private productStoragetService : ProductStorageService,
    private hardwareStoreUserService : HardwareStoreUserService, private moveProductService : MoveProductService) {
    this.form = fb.group({
      moveToWarehouseId : ['',Validators.required],
      fromWarehouseId : ['',Validators.required],
      hardwareProductId : ['', Validators.required],
      quantity : ['', Validators.required]
    })
   }

  ngOnInit(): void {
    const hardwareProductId : number = Number(this.urlParam.snapshot.paramMap.get('productId'))
    this.loadWarehouseInfo(hardwareProductId)
  } 
  loadProduct(hardwareProductId : number, warehouseId : number){
    this.productStoragetService.getProduct(warehouseId, hardwareProductId)
      .subscribe((data) => {
        this.product = data;
        console.log(this.product);
      })
  } 
  loadWarehouseInfo(hardwareProductId : number){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
      .subscribe((data) => {
        console.log(data)
        this.loadProduct(hardwareProductId, Number(data.warehouseId))
        this.loadWarehouses(Number(data.warehouseId))
        this.form.controls['fromWarehouseId'].setValue(data.warehouseId)
        this.form.controls['hardwareProductId'].setValue(hardwareProductId)
      })
  }
  move(){ 
    this.isValid = true
    if(this.form.valid){
      let isConfirm = confirm('Are you sure you want to transfer this product to another warehouse? ')
      if(isConfirm){
        alert('Holla')
        const data : any = JSON.stringify(this.form.value)
        console.log(data)
        this.onMoveProduct(data)
      } 

    }else{
      this.isValid = false
      this.errorMessage = "Invalid Input."
    }
  } 
  onMoveProduct(data : any){
    this.moveProductService.moveProduct(data)
      .subscribe((res) => {
        if(res.success == 1){
          let product : any = JSON.parse(data) 
          this.loadProduct(Number(product.hardwareProductId), Number(product.fromWarehouseId))
          alert(res.message) 

        }
      }, (err) => {
        this.isValid = false
        this.errorMessage = "Something went wrong."
        alert('Something went wrong.')
        console.log(err)
      })
  }
  loadWarehouses(warehouseId : number){
    this.warehouseService.getWarehouses()
    .subscribe((data) => {
      this.warehouses = data
      this.warehouses = this.warehouses.filter(w => w.id != warehouseId)
      console.log(this.warehouses)
    })
  }

}
