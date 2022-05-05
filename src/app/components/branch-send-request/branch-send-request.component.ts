import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { ProductService } from 'src/app/services/product.service';
import { RequestService } from 'src/app/services/request.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-branch-send-request',
  templateUrl: './branch-send-request.component.html',
  styleUrls: ['./branch-send-request.component.css']
})
export class BranchSendRequestComponent implements OnInit {

  products : any[] = []
  warehouses : any[] = []
  form : FormGroup;
  isValid : boolean = true
  errorMessage : string = ''
  constructor(private fb : FormBuilder,private hardwareStoreUserService : HardwareStoreUserService, private productService : ProductService, private warehouseService : WarehouseService, private requestService : RequestService) {
    this.form = fb.group({
      hardwareProductId : ['', Validators.required],
      warehouseId : ['', Validators.required],
      quantity : ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.storeAdminInfo()
    this.loadWarehouses()
  }
  storeAdminInfo() : void {
    this.hardwareStoreUserService.getStoreAdminInfo()
      .subscribe((data) => {
        this.loadProducts(Number(data.branchId))
      })
  }
  loadProducts(branchId : number) : void {
    this.productService.getHardwareProducts(branchId)
      .subscribe((data) => {
        this.products = data
        console.log(this.products)
      })
  }
  loadWarehouses() : void {
    this.warehouseService.getWarehouses()
      .subscribe((data) => {
        this.warehouses = data
        console.log(this.warehouses)
      })
  } 

  async sendRequest() : Promise<void> {
    this.isValid = true
    if(this.form.valid){
      const sendBtn = document.getElementById("sbt-btn") as HTMLButtonElement;
      sendBtn.innerHTML = 'Processing...' 
      const data = JSON.stringify(this.form.value)
      await this.onSendRequest(data)
    }else{
      this.isValid = false
      this.errorMessage = 'Invalid Input'
    }
    
  } 

  async onSendRequest(data : any) : Promise<void> {
    const sendBtn = document.getElementById("sbt-btn") as HTMLButtonElement;
    
    this.requestService.send(data)
      .subscribe((res)  => {
        alert(res.message)
        sendBtn.classList.remove('btn-warning')
        sendBtn.classList.add('btn-success')
        sendBtn.classList.add('fs')
        sendBtn.innerHTML = 'Your request has been sent successfully.' 
        this.changeBtnAppearance()
      }, (err) => {
        sendBtn.classList.remove('btn-warning')
        sendBtn.classList.add('btn-danger')
        sendBtn.innerHTML = 'Something went Wrong'
        this.changeBtnAppearance()
      })

      
  }
  async changeBtnAppearance() {
    const sendBtn = document.getElementById("sbt-btn") as HTMLButtonElement;

    await this.delay(3000)
    sendBtn.classList.remove('btn-success')
    sendBtn.classList.remove('fs')
    sendBtn.classList.add('btn-warning')
    sendBtn.innerHTML = 'Process Request' 
  }
  delay(ms : number) {
    return new Promise(r => setTimeout(r, ms))
  }
}
