import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ICart } from 'src/app/models/cart-model/cart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPostOrder } from 'src/app/models/order-models/postorder';
import { OrderService } from 'src/app/services/order.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CartDetails } from 'src/app/models/cart-model/cartDetails.model';

declare const L : any;
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  latitude : string = ''
  longtitude : string = ''

  productsInCart : ICart[] = []
  cartDetails : CartDetails
  hardwareStoreId : number
  branchId : number
  total : number = 0

  orderForm :  FormGroup
  deliver : boolean = false
  buttonText : string = "Place Order";
  contactNumber : string = ""
  isValid : boolean = true
  messageError : string
  isSuccess : boolean = false 

  nbiImageFile : File;
  brgyClearanceImageFile : File;
  governmentidImageFile : File;
  bankStatementImageFile : File;
  birthDate : Date
  age : number
  constructor(private accountService : AccountService, private route : Router, private cartService : CartService, private urlParam : ActivatedRoute, private orderService : OrderService, private formBuilder : FormBuilder, private customerService : CustomerService) {
    this.orderForm = formBuilder.group({
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      address : ['',[Validators.required]],
      email : ['',[Validators.required, Validators.email]],
      contactNo : ['',[Validators.required]],
      // barangayClearance : [this.brgyClearanceImageFile, Validators.required],
      // nbi : [this.nbiImageFile, [Validators.required]],
      // governmentId : [this.governmentidImageFile, Validators.required],
      // bankStatement : [this.bankStatementImageFile],
      // age : ['', Validators.required],
      // birthDate : ['', Validators.required]
    }) 

    // this.orderForm.controls['bankStatement'].removeValidators
   }

  ngOnInit(): void {
    const storeIdParam = this.urlParam.snapshot.paramMap.get('hardwareStoreId')
    this.branchId = Number(this.urlParam.snapshot.paramMap.get('branchId'))
    this.hardwareStoreId = Number(storeIdParam) 
    if(this.accountService.isLoggedIn()){
      this.loadCustomerInfo()
       this.cartService.getProductsInCartV2(this.hardwareStoreId, this.branchId)
        .subscribe((data)=>{
          this.cartDetails = data;
          this.productsInCart = data.cartItems;
          this.productsInCart.forEach((product)=>{
            this.total += (product.productPrice * product.productQuantity);
          })
        }) 
    }else{
      this.route.navigate(['/login'])
    }
    // pk.eyJ1Ijoic295YmkyMiIsImEiOiJjbDByb2VtdWEwNWc2M2tvMjZhcGdnb3Q5In0.xjFStx4zy9ZMC0tu2dARgA
    // if(this.deliver)
    //   this.loadMap()
    //this.loadMap()
  } 

  loadMap(lat : number, lng : number) : void {
    if(lat === 0 || lng === 0){
      alert('Please set your location. Go to your account.')
    }
    var map = L.map('map').setView([lat !== 0 ? lat : 51.505, lng !== 0 ? lng : -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic295YmkyMiIsImEiOiJjbDFkM3phOWYwZHZqM2pvMGNnejBmc2M4In0.dmFiv4Ss4Nd44nJ9X4xxeA', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }).addTo(map);

    var marker = L.marker([lat !== 0 ? lat : 51.505, lng !== 0 ? lng : -0.09]).addTo(map);
    //let prevMarked : any = {}
    // map.on('click', (event : any) => {
    //   // let lat = event.latlang.lat;
    //   // let lng = event.latlang.lng;
    //   this.latitude = event.latlng.lat.toString();
    //   this.longtitude = event.latlng.lng.toString();
    //   //console.log(lat + ' - ' + lng)
    //   if(marker != undefined){
    //     map.removeLayer(marker)
    //   }

    //   marker = L.marker(event.latlng).addTo(map);
    // })

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    let obj = L.Control.geocoder().addTo(map);
    console.log(obj)
  }

  loadCustomerInfo() : void {
    this.customerService.getCustomerInfo().
      subscribe((data) => {
        console.log(data)
        this.latitude = data.latitude.toString();
        this.longtitude = data.longitude.toString();
        this.loadMap(Number(this.latitude), Number(this.longtitude));
        this.setCustomerInfo(data)
      })
  }

  setCustomerInfo(customer : any ) : void {
    this.orderForm.controls['firstName'].setValue(customer.firstName)
    this.orderForm.controls['lastName'].setValue(customer.lastName);
    this.orderForm.controls['address'].setValue(customer.address)
    this.orderForm.controls['email'].setValue(customer.email)
    this.orderForm.controls['contactNo'].setValue(customer.contactNo)
  }
  order(){
    if(this.productsInCart.length > 0){
      if (this.deliver && this.longtitude === '0' && this.latitude === '0') {
        this.isValid = false;
        this.messageError = 'Please set your exact location'
        return;
      }

      if(this.orderForm.valid){
        this.contactNumber = this.orderForm.controls['contactNo'].value.toString()
        if(this.contactNumber.length >= 10 && this.contactNumber.length <= 13){
          this.createOrder()
          this.isValid = true
        }else{
          alert('Invalid')
          this.isValid = false
          this.messageError = 'Contact number must have 10 characters.'
        }
        
      }else{
        alert('Invalid')
        this.isValid = false
        this.messageError = 'Please fill up the form correctly.'
      }
    }else{
      alert("There's no one product that to be order.")
      this.isValid = false
      this.messageError = "There's no one product that to be order."
    }
  } 
  nbiIsValid() : boolean {
    return (this.orderForm.controls['nbi'].invalid && (this.orderForm.controls['nbi'].pristine || this.orderForm.controls['nbi'].touched))
  }
  brgyClearanceIsValid() : boolean {
    return (this.orderForm.controls['barangayClearance'].invalid && (this.orderForm.controls['barangayClearance'].pristine || this.orderForm.controls['barangayClearance'].touched));
  }
  governmentIdIsValid() : boolean {
    return (this.orderForm.controls['governmentId'].invalid && (this.orderForm.controls['governmentId'].pristine || this.orderForm.controls['governmentId'].touched))
  }
  isBirthDateValid() : boolean {
    return (this.orderForm.controls['birthDate'].invalid && (this.orderForm.controls['birthDate'].pristine || this.orderForm.controls['birthDate'].touched))
  }
  isAgeValid() : boolean {
    return (this.orderForm.controls['age'].invalid && (this.orderForm.controls['age'].pristine || this.orderForm.controls['age'].touched))
  }
  selectedBankStatement(event : any) : void {
    const bankStatement = <File>event.target.files[0];
    this.bankStatementImageFile = bankStatement;
    this.orderForm.controls['bankStatement'].setValue(this.bankStatementImageFile)
  }
  selectedGovernmentId(event : any) : void{
    const governmentId = <File>event.target.files[0];
    this.governmentidImageFile = governmentId;
    this.orderForm.controls['governmentId'].setValue(this.governmentidImageFile)
  }
  selectedBrgyClearance(event : any) : void {
    const brgyclearance = <File>event.target.files[0];
    this.brgyClearanceImageFile = brgyclearance;
    this.orderForm.controls['barangayClearance'].setValue(this.brgyClearanceImageFile)
  }
  selectedNbi(event : any) : void {
    const nbiFile = <File>event.target.files[0];
    this.nbiImageFile = nbiFile
    this.orderForm.controls['nbi'].setValue(this.nbiImageFile)
  }
  onSetBirthDate(event : any) : void {
    const birthDate = new Date(event.target.value)
    this.orderForm.controls['birthDate'].setValue(birthDate.toDateString())
    this.birthDate = birthDate
  }
  setAge(event : any) : void {
    const age = Number(event.target.value);
    if(age > 0){
      this.orderForm.controls['age'].setValue(age)
      this.age = age
    }else{
      this.orderForm.controls['age'].setValue('')
    }
  }
  private createOrder(){
    //const btn = document.getElementById('submit-btn') as HTMLButtonElement;

    const order : IPostOrder = {
      hardwareStoreId : this.hardwareStoreId,
      branchId : this.branchId,
      address : this.orderForm.controls['address'].value,
      firstName : this.orderForm.controls['firstName'].value,
      lastName : this.orderForm.controls['lastName'].value,
      email : this.orderForm.controls['email'].value,
      contactNo : this.orderForm.controls['contactNo'].value.toString(),
      deliver : this.deliver,
      products : this.productsInCart,
      latitude : this.deliver ? this.latitude : '',
      longtitude : this.deliver ? this.longtitude : '',
      shippingFee : this.cartDetails.shippingFee
      // barangayClearance : this.brgyClearanceImageFile,
      // nbi : this.nbiImageFile,
      // governmentId : this.governmentidImageFile,
      // bankStatement : this.bankStatementImageFile,
      // age : this.age,
      // birthDate : this.birthDate.toDateString()
    } 

    // const formData = new FormData();
    // formData.append('hardwareStoreId', order.hardwareStoreId.toString())
    // formData.append('branchId', order.branchId.toString())
    // formData.append('address', order.address)
    // formData.append('firstName', order.firstName)
    // formData.append('lastName', order.lastName)
    // formData.append('email', order.email)
    // formData.append('contactNo', order.contactNo)
    // formData.append('deliver', order.deliver.toString())
    // formData.append('products', JSON.stringify(order.products))
    // formData.append('latitude', order.latitude)
    // formData.append('longtitude', order.longtitude)
    // formData.append('barangayClearance', order.barangayClearance, order.barangayClearance.name)
    // formData.append('nbi', order.nbi, order.nbi.name)
    // formData.append('governmentId', order.governmentId, order.governmentId.name)
    // formData.append('bankStatement', order.bankStatement, order.bankStatement.name)
    // formData.append('age', order.age.toString())
    // formData.append('birthDate', order.birthDate)

    console.log(order)
    console.log(JSON.stringify(order.products))
    this.buttonText = "Processing..."
    this.isSuccess = true
    // btn.classList.remove('sbt-btn')
    // btn.classList.add('btn-primary')
    this.orderService.postOrder(order)
    .subscribe((res)=>{
      if(res.success == 1){
        // alert(res.message)
        // btn.classList.remove('btn-primary')
        // btn.classList.add('btn-success')
        this.buttonText = "Order Successfully Posted"
        this.total = 0
        this.productsInCart = []
      }
    }, (err)=>{
      this.buttonText = 'Something went wrong'
      // btn.classList.remove('btn-primary')
      // btn.classList.add('btn-danger')
      this.isSuccess = false
      alert('Something went wrong')
    })
  }
  isDeliver(){
    this.deliver = !this.deliver;
    //this.loadMap()
    //alert(this.deliver)
  }
  back(){
    this.route.navigate(['/cart',this.hardwareStoreId,this.branchId,'p','none'])
  }
  

}
