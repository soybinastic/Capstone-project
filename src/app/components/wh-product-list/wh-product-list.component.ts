import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { ProductStorageService } from 'src/app/services/product-storage.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-wh-product-list',
  templateUrl: './wh-product-list.component.html',
  styleUrls: ['./wh-product-list.component.css']
})
export class WhProductListComponent implements OnInit {

  products : any[] = []
  productSearchSource : any[] = []
  warehouses : any[] = [] 
  selectedWarehouseId : number = 0

  constructor(private hardwareStoreUserService : HardwareStoreUserService, 
    private productStorageService : ProductStorageService, private accountService : AccountService, private warehouseService : WarehouseService) { }

  ngOnInit(): void {
    this.initProducts()
  } 
  initProducts(){
    if(this.getRole() == "WarehouseAdmin"){
      this.loadProductWithWarehouseAdmin()
    }else{
      this.loadWarehouses()
      if(!!localStorage.getItem('warehouse_id_selected')){ 
        this.selectedWarehouseId = Number(localStorage.getItem('warehouse_id_selected'))
        this.loadProducts(Number(localStorage.getItem('warehouse_id_selected')))
      }
    }
  }
  getRole() : string{
    const role = this.accountService.getUserRole()
    return role;
  } 
  loadWarehouses(){
    this.warehouseService.getWarehouses()
    .subscribe((data) => {
      this.warehouses = data;
    })
  } 
  selectedWarehouse(event : any){
    const warehouseId = event.target.value;  
    localStorage.setItem('warehouse_id_selected', warehouseId)
    this.loadProducts(warehouseId);
  } 
  search(event : any) {
    let productName = event.target.value;
    productName = productName.toString().toLocaleLowerCase();
    console.log(productName) 
    this.products = this.productSearchSource.filter((val) => {
      return val.hardwareProduct.name.toString().toLocaleLowerCase().includes(productName)
    }) 
    if(productName.length == 0){
      this.products = this.productSearchSource
    }
  }
  textEllipsis(data : any){
    for(let i = 0; i < data.length; i++){
      let description = ''
      if(data[i].hardwareProduct.description?.length > 25){
        for(let j = 0; j < data[i].hardwareProduct.description.length; j++){
          description += data[i].hardwareProduct.description[j];
          if(j == 25){
            description += '...'
            break;
          }
        } 

        data[i].hardwareProduct.description = description;
      }
    }
  }
  loadProductWithWarehouseAdmin(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
    .subscribe((data) => {
      this.loadProducts(data.warehouseId)
    })
  } 
  loadProducts(warehouseId : number){
    this.productStorageService.getProducts(warehouseId)
    .subscribe((data) => {
      
      this.products = data
      this.productSearchSource = data
      this.textEllipsis(this.products)
      console.log(this.products)
    })
  }
}
