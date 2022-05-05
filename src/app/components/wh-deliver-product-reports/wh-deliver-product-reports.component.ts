import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { DeliverProductService } from 'src/app/services/deliver-product.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-wh-deliver-product-reports',
  templateUrl: './wh-deliver-product-reports.component.html',
  styleUrls: ['./wh-deliver-product-reports.component.css']
})
export class WhDeliverProductReportsComponent implements OnInit {

  deliverProducts : any[] = []
  warehouses : any[] = []
  selectedWarehouseId : number
  constructor(private hardwareStoreUserService : HardwareStoreUserService, 
    private deliverProductService : DeliverProductService, private accountService : AccountService, private warehouseService : WarehouseService) { }

  ngOnInit(): void {
    if(this.getRole() == 'WarehouseAdmin'){
      this.warehouseAdminInfo()
    }else{
      this.loadWarehouses()
      if(!!localStorage.getItem('warehouse_id_selected')){
        this.selectedWarehouseId = Number(localStorage.getItem('warehouse_id_selected'))
        this.loadDeliverProductReports(this.selectedWarehouseId)
      }
    }
  }
  selectedWarehouse(event : any){
    const warehouseId : number = Number(event.target.value)
    this.loadDeliverProductReports(warehouseId)
  } 
  loadWarehouses(){
    this.warehouseService.getWarehouses()
        .subscribe((data) => {
          this.warehouses = data
        })
  }
  getRole() : string {
    return this.accountService.getUserRole()
  }
  warehouseAdminInfo(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
      .subscribe((data) => {
        this.loadDeliverProductReports(Number(data.warehouseId))
      })
  }
  loadDeliverProductReports(warehouseId : number){
    this.deliverProductService.getDeliverProductReports(warehouseId)
      .subscribe((data) => {
        this.deliverProducts = data
        console.log(this.deliverProducts)
      })
  }
  showToggle(id : string) : void {
    const deliverProducts = document.getElementById(id) as HTMLDivElement;
    deliverProducts.hidden = !deliverProducts.hidden;
  }
}
