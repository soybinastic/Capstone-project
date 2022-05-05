import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { RecieveProductService } from 'src/app/services/recieve-product.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-wh-recieve-products',
  templateUrl: './wh-recieve-products.component.html',
  styleUrls: ['./wh-recieve-products.component.css']
})
export class WhRecieveProductsComponent implements OnInit {

  recieveProducts : any[] = []
  warehouses : any[] = []
  selectedWarehouseId : number = 0
  constructor(private recieveProductService : RecieveProductService, private hardwareStoreUserService : HardwareStoreUserService, private warehouseService : WarehouseService, private accountService : AccountService) { }

  ngOnInit(): void {
    if(this.getRole() == 'WarehouseAdmin'){
      this.loadWarehouseAdminInfo()
    }else if(this.getRole() == 'StoreOwner' || this.getRole() == 'SuperAdmin'){
      this.loadWarehouses() 
      if(!!localStorage.getItem('warehouse_id_selected')){
        this.selectedWarehouseId = Number(localStorage.getItem('warehouse_id_selected'))
        this.loadReports(this.selectedWarehouseId)
      }
    }
  } 

  getRole() : string{
    return this.accountService.getUserRole();
  } 
  loadWarehouses(){
    this.warehouseService.getWarehouses()
    .subscribe((data) => {
      this.warehouses = data
      console.log(this.warehouses)
    })
  }
  selectedWarehouse(event : any){
    const warehouseId : number = Number(event.target.value)
    this.loadReports(warehouseId)
  }  
  loadWarehouseAdminInfo(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
    .subscribe((data) => {
      this.loadReports(Number(data.warehouseId))
    })
  }
  loadReports(warehouseId : number){
    this.recieveProductService.getReports(warehouseId)
    .subscribe((data) => {
      this.recieveProducts = data
      console.log(this.recieveProducts)
    })
  }

}
