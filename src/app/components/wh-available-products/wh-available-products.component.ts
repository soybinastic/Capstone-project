import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { ProductStorageService } from 'src/app/services/product-storage.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-wh-available-products',
  templateUrl: './wh-available-products.component.html',
  styleUrls: ['./wh-available-products.component.css']
})
export class WhAvailableProductsComponent implements OnInit {

  warehouses : any[] = []
  availableProducts : any[] = []
  selectedWarehouseId : number = 0
  constructor(private accountService : AccountService, private productStorageService : ProductStorageService, private hardwareStoreUserService : HardwareStoreUserService, private warehouseService : WarehouseService) { }

  ngOnInit(): void { 
    if(this.getRole() == 'WarehouseAdmin'){
      this.loadWarehouseAdminInfo()
    }else{
      this.loadWarehouse() 
      if(!!localStorage.getItem('warehouse_id_selected')){
        this.selectedWarehouseId = Number(localStorage.getItem('warehouse_id_selected'))
        this.loadAvailableProducts(this.selectedWarehouseId)
      }
    }
  }
  selectedWarehouse(event : any){
    const warehouseId : number = Number(event.target.value)
    this.loadAvailableProducts(warehouseId)
  } 
  loadWarehouseAdminInfo(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
      .subscribe((data) => {
        this.loadAvailableProducts(Number(data.warehouseId))
      })
  }
  getRole() : string {
    return this.accountService.getUserRole()
  }
  loadAvailableProducts(warehouseId : number){
    this.productStorageService.getAvailableInStocks(warehouseId)
      .subscribe((data) => {
        this.availableProducts = data
      })
  } 
  loadWarehouse() {
    this.warehouseService.getWarehouses()
      .subscribe((data) => {
        this.warehouses = data
      })
  }
}
