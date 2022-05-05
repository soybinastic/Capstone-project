import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-management',
  templateUrl: './warehouse-management.component.html',
  styleUrls: ['./warehouse-management.component.css']
})
export class WarehouseManagementComponent implements OnInit {

  warehouses : any[] = []
  constructor(private warehouseService : WarehouseService) { }

  ngOnInit(): void {
    this.loadWarehouses()
  }
  loadWarehouses(){
    this.warehouseService.getWarehouses()
    .subscribe((data)=>{
      this.warehouses = data
      console.log(this.warehouses)
    })
  }
}
