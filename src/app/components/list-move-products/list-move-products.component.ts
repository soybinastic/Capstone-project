import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { MoveProductService } from 'src/app/services/move-product.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-list-move-products',
  templateUrl: './list-move-products.component.html',
  styleUrls: ['./list-move-products.component.css']
})
export class ListMoveProductsComponent implements OnInit {

  twoDim : any [][] = [['test','test1','test2'],['tes5','tes','test4']] 
  moveProductsDisplay : any[][] = [];
  moveProducts : any[] = []
  warehouses : any[] = [] 
  selectedWarehouseId : number = 0
  constructor(private moveProductService : MoveProductService, private accountService : AccountService, private hardwareStoreUserService : HardwareStoreUserService, private warehouseService : WarehouseService) { }

  ngOnInit(): void {
    if(this.getRole() == 'WarehouseAdmin'){
      this.loadWarehouseAdminInfo()
    }else {
      this.loadWarehouses()
      if(!!localStorage.getItem('warehouse_id_selected')){ 
        this.selectedWarehouseId = Number(localStorage.getItem('warehouse_id_selected'))
        this.loadMoveProducts(Number(localStorage.getItem('warehouse_id_selected')))
      }
    }
  }  
  selectedWarehouse(event : any){
    this.moveProductsDisplay = []
    const warehouseId : number = Number(event.target.value)
    this.loadMoveProducts(warehouseId)
  }
  loadWarehouses(){
    this.warehouseService.getWarehouses()
      .subscribe((data) => {
        this.warehouses = data
      })
  }
  loadMoveProducts(warehouseId : number){
    this.moveProductService.getMoveProducts(warehouseId)
      .subscribe((data) => {
        this.moveProducts = data;
        console.log(this.moveProducts)
        this.arrangeData(this.moveProducts)
      })
  } 
  arrangeData(data : any[]){
    let groupDate : any[];

    for(let i = 0; i < data.length; i++){
      groupDate = []
      let counter = 0;
      let moveDate = new Date(data[i].moveDate)
      //let moveDateRight = new Date(data[i+1].moveDate)
      groupDate = data.filter(mv => new Date(mv.moveDate).getFullYear() == moveDate.getFullYear() && new Date(mv.moveDate).getMonth() == moveDate.getMonth() && new Date(mv.moveDate).getDate()== moveDate.getDate()) 

      for(let index = 0; index < this.moveProductsDisplay.length; index++){
        counter = 0
        for(let rowIndex = 0; rowIndex < this.moveProductsDisplay[0].length; rowIndex++){

          if(new Date(this.moveProductsDisplay[index][rowIndex]?.moveDate).getMonth() == new Date(groupDate[rowIndex]?.moveDate).getMonth() && new Date(this.moveProductsDisplay[index][rowIndex]?.moveDate).getDate() == new Date(groupDate[rowIndex]?.moveDate).getDate() && new Date(this.moveProductsDisplay[index][rowIndex]?.moveDate).getFullYear() == new Date(groupDate[rowIndex]?.moveDate).getFullYear()){
            counter += 1
          }
        } 
        
      }

      if(counter == 0){
        this.moveProductsDisplay.push(groupDate)
      }
      // let isDuplicate = this.moveProductsDisplay.filter(mpd => new Date(mpd[i].moveDate) == new Date(groupDate[i].moveDate)) 
      console.log(counter)

      // if(isDuplicate == null){
      //   this.moveProductsDisplay.push(groupDate)
      // }
      
      
    } 


    console.log(this.moveProductsDisplay)
  }
  loadWarehouseAdminInfo(){
    this.hardwareStoreUserService.getWarehouseAdminInfo()
      .subscribe((data) => {
        this.loadMoveProducts(Number(data.warehouseId))
      })
  } 
  getRole() : string{
    return this.accountService.getUserRole();
  }
}
