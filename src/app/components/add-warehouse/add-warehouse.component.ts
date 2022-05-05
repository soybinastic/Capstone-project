import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css']
})
export class AddWarehouseComponent implements OnInit {

  addForm : FormGroup;
  isValidInput : boolean = true
  errorMessage : string = ''
  constructor(private formBuilder : FormBuilder, private warehouseService : WarehouseService) {
    this.addForm = formBuilder.group({
      warehouseName : ['', Validators.required],
      address : ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  onAdd() {
    if(this.addForm.valid){
      alert('validd')
      const data = JSON.stringify(this.addForm.value)
      console.log(data)

      this.addWareHouse(data)
    }else{
      this.isValidInput = false;
      this.errorMessage = 'Invalid Input'
    }
  } 

  addWareHouse(data : any){
    this.warehouseService.addWarehouse(data)
    .subscribe((res)=>{
      if(res.success == 1){
        alert(res.message)
        this.isValidInput = true;
        this.errorMessage = ''
      }
    }, (err)=>{
      console.log(err)
      this.isValidInput = false;
      this.errorMessage = 'Something went wrong please try again later.'
    })
  }
}
