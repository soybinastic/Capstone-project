import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CustomerOrderRecieveImageService } from 'src/app/services/customer-order-recieve-image.service';
import { OrderService } from 'src/app/services/order.service';

declare const L : any

@Component({
  selector: 'app-branch-order-details',
  templateUrl: './branch-order-details.component.html',
  styleUrls: ['./branch-order-details.component.css']
})
export class BranchOrderDetailsComponent implements OnInit {
  files : File[] = []
  imageFiles : string[] = []
  order : any = {}
  orderProducts : any[] = []
  customerOrderDetails : any = {}
  orderId : number
  isCancelled : boolean
  _isOnChangeValue : boolean
  buttonText : string = 'Confirm'
  attachBtnText : string = 'Attach'
  approveBtnText : string = 'Approve' 
  confirmBtnText : string = 'Confirm Order'
  attachBtnIsShow: boolean = false 
  completedOrder : any = null
  salesClerks : any[] = []
  salesClerkId : number = 0
  alert : any = {}
  doneBtnTxt : string = "DONE"
  constructor(private orderService : OrderService, private urlParam : ActivatedRoute, 
    private customerOrderRecieveImageService : CustomerOrderRecieveImageService, private accountService : AccountService) { }

  ngOnInit(): void {
    const orderId : number = Number(this.urlParam.snapshot.paramMap.get('orderId'))
    this.orderId = orderId;

    this.getOrder(orderId)
    this.getCustomerDetails(orderId)
    this.loadOrderProducts(orderId)
    this.getImages() 

    if(this.getRole() == 'StoreAdmin'){
      this.loadCompletedOrder()
      this.loadSalesClerks();
    }
  } 
  loadMap(lat : number, lng : number) : void {
    var map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic295YmkyMiIsImEiOiJjbDFkM3phOWYwZHZqM2pvMGNnejBmc2M4In0.dmFiv4Ss4Nd44nJ9X4xxeA', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }).addTo(map);

    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup("<b>" + this.customerOrderDetails.firstName + " " + this.customerOrderDetails.lastName + "</b>").openPopup();
    var popup = L.popup()
    .setLatLng([lat, lng])
    .setContent(this.customerOrderDetails.firstName + " " + this.customerOrderDetails.lastName)
    .openOn(map);
  }
  getRole() : string {
    return this.accountService.getUserRole()
  }
  
  loadSalesClerks() : void {
    this.orderService.salesClerks()
      .subscribe(data => {
        this.salesClerks = data
        console.log(this.salesClerks)
      }, err => {
        
      })
  }

  loadCompletedOrder() : void {
    this.orderService.getCompletedOrder(this.orderId)
      .subscribe((data) => {
        this.completedOrder = data
        console.log('Complted order')
        console.log(this.completedOrder)
      })
  }
  approveOrder() : void {
    this.alert.message = ""
    this.alert.isShow = false;
    if(this.salesClerkId === 0) {
      this.alert.isShow = true;
      this.alert.isError = true;
      this.alert.message = "Please assign a sales clerk to prepare this order";
      return;
    }
    
    this.onApproveOrder()
  }
  donePreparing() : void {
    this.doneBtnTxt = "Processing..."
    this.orderService.toDeliver(this.orderId)
      .subscribe(data => {
        this.order = data.order
        this.alert.isShow = true;
        this.alert.isError = false;
        this.alert.message = "Success";
        this.doneBtnTxt = "DONE"
      }, err => {
        this.alert.isShow = true;
        this.alert.isError = true;
        this.alert.message = err.error.message;
        this.doneBtnTxt = "DONE"
      })
  }
  onApproveOrder() : void {
    this.approveBtnText = 'Approving...'
    this.orderService.approveOrder(this.orderId, this.salesClerkId)
      .subscribe((res) => {
        this.order.isApproved = true
        this.alert.isShow = true;
        this.alert.isError = false;
        this.alert.message = res.message;
      }, (err) => {
        console.log(err)
        this.alert.isShow = true;
        this.alert.isError = true;
        this.alert.message = err.error.message;
        this.approveBtnText = 'Approve'
      })
  } 

  confirmOrder() : void {
    this.onConfirmOrder()
  }
  onConfirmOrder() : void {
    this.confirmBtnText = 'Confirming...'
    this.orderService.confirmOrder(this.orderId)
      .subscribe((res) => {
        alert(res.message)
        this.completedOrder.isConfirmed = true
      }, (err) => {
        alert('Something went wrong')
      })
  }
  selectedImages(event : any) : void {
    const files : File[] = <File[]>event.target.files; 
    this.files = files
    console.log(this.files)
    this.attachBtnIsShow = true
  }
  attachImages() : void {
    const formData = new FormData(); 
    if(this.files.length == 0){
      this.attachBtnIsShow = false
      alert('There is no images file to be upload')
      return;
    } 

    Array.from(this.files).map((file, index) => {
      return formData.append('file' + index, file, file.name)
    }) 

    this.onAttachImages(formData)
  }
  getImages() : void {
    this.customerOrderRecieveImageService.getImages(this.orderId)
      .subscribe((data) => {
        
        console.log(data)
        this.imageFiles = data.map((d, i) => {
          return d.imageFile
        })
        console.log(this.imageFiles)
      })
  }
  onAttachImages(formData : FormData) : void {
    this.attachBtnText = 'Attaching...'
    this.customerOrderRecieveImageService.addImage(formData, this.orderId)
      .subscribe((res) => {
        this.imageFiles = res
        this.attachBtnIsShow = false
        this.attachBtnText = 'Attach'
        console.log(this.imageFiles)
      }, (err) => {
        alert('Something went wrong.')
      })
  }
  getOrder(orderId : number) : void {
    this.orderService.getOrder(orderId)
      .subscribe((data) => {
        this.order = data
        console.log('Order')
        console.log(this.order)
      })
  }
  getCustomerDetails(orderId : number) : void {
    this.orderService.getOrderDetails(orderId)
      .subscribe((data) => {
        this.customerOrderDetails = data
        this.loadMap(Number(this.customerOrderDetails.latitude), Number(this.customerOrderDetails.longtitude))
        console.log('Customer Order Details')
        console.log(this.customerOrderDetails)
      })
  }
  loadOrderProducts(orderId : number) : void {
    this.orderService.getOrderProducts(orderId)
      .subscribe((data) => {
        this.orderProducts = data;
        console.log('Order Products')
        console.log(this.orderProducts)
      })
  }
  statusClasses(status : string) : string {
    switch(status){
      case 'Pending':
        return 'status-span pending';
      case 'Cancelled':
        return 'status-span cancelled';
      case 'Completed':
        return 'status-span completed';
      case 'Preparing':
        return 'status-span bg-primary';
      case 'To Deliver':
        return 'status-span bg-dark';
      default:
        return ''
    }
  }
  orderStatusSelected(event : any) : void {
    const value = Number(event.target.value);
    
    switch(value){
      case 1 :
        this.isCancelled = true;
        this._isOnChangeValue = true;
        break;
      case 2 :
        this.isCancelled = false;
        this._isOnChangeValue = true;
        break;
      default:
        this._isOnChangeValue = false;
        break;
    }
  }
  selectedSalesClerk(event : any) : void {
    this.salesClerkId = Number(event.target.value)
  }
  isDeliverClasses(isDeliver : boolean) : string {
    return isDeliver ? 'status-span yes' : 'status-span no'
  } 
  onUpdateOrder() : void {
    if(this._isOnChangeValue){
      alert(this.isCancelled ? 'Cancelled' : 'Done')
      this.buttonText = 'Confirming...'
      this.updateOrder()
    }
  }

  updateOrder() : void {
    const order : any = {
      orderId : this.orderId,
      hardwareStoreId : this.order.hardwareStoreId,
      branchId : this.order.branchId,
      customerId : this.order.customerId,
      isCancelled : this.isCancelled
    }
    console.log(order)
    this.orderService.updateOrder(this.orderId, order)
      .subscribe((res) => {
        alert(res.message)
        this.order.status = this.isCancelled ? 'Cancelled' : 'Completed'
        this.buttonText = 'Confirm'
      }, (err) => {
        alert('Something went wrong.')
        this.buttonText = 'Confirm'
      })
  }
}
