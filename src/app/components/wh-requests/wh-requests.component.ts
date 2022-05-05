import { Component, OnInit } from '@angular/core';
import { DeliverProductService } from 'src/app/services/deliver-product.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-wh-requests',
  templateUrl: './wh-requests.component.html',
  styleUrls: ['./wh-requests.component.css']
})
export class WhRequestsComponent implements OnInit {

  show : string = ''
  hardwareProductId : number = 0
  divId : string
  refreshIdentifier : string = ''
  requests : any[] = []
  requestProduct : any = {}
  branchId : number
  constructor(private requestService : RequestService, private deliverProductService : DeliverProductService) { }

  ngOnInit(): void {
    this.loadRequests()
  }

  loadRequests() : void {
    this.requestService.getRequestsSend()
      .subscribe((data) => {
        this.requests = data
        console.log(this.requests)
      })
  }
  showToggle(id : number){
  
    const table = document.getElementById(id.toString()) as HTMLTableElement
    table.hidden = !table.hidden
    this.closeDeliverComponent('dp'+id.toString())
  }
  async deliver(id : string, hardwareProductId : number, requestProduct : any, branchId : number){
    const deliverProductComponent = document.getElementById(id) as HTMLDivElement
    //deliverProductComponent.hidden = false
    this.divId = ''
    this.refreshIdentifier = id
    await this.delay(1000)

    this.hardwareProductId = hardwareProductId
    this.requestProduct = requestProduct
    this.branchId = branchId

    this.refreshIdentifier = ''
    this.divId = id
  }
  delay(ms : number){
    return new Promise(r => setTimeout(r, ms))
  }
  closeDeliverComponent(id : string){
    const deliverProductComponent = document.getElementById(id) as HTMLDivElement
    //deliverProductComponent.hidden = true
    this.divId = ''
  } 

  onDeliverProduct(data : any) : void {
    console.log(data)
    this.onDeliver(data)
  }
  onDeliver(data : any) : void {
    this.deliverProductService.deliverProduct(data)
      .subscribe((res) => {
        alert(res.message)
        this.closeDeliverComponent('')
        this.makeCompleteRequestProduct()
      }, (err) => {
        alert('Something went wrong')
      })
  }
  makeCompleteRequestProduct() : void {
    this.requestProduct.isComplete = true
  }
}
