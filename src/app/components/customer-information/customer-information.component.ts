import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
declare const L : any;
@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css']
})
export class CustomerInformationComponent implements OnInit {

  customer : any = {}
  form : FormGroup
  btnText : string = 'Update'
  constructor(private fb : FormBuilder, private customerService : CustomerService) {
    this.form = fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      address : ['', Validators.required],
      contactNo : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(12)]],
      middleName : ['', Validators.required],
      age : ['', Validators.required],
      birthDate : ['', Validators.required],
      lat : [''],
      lng : ['']
    })
   }

  ngOnInit(): void {
    this.form.disable()
    this.loadCustomer()
    //this.initMap()
  }

  loadCustomer() : void {
    this.customerService.getCustomerInfo()
      .subscribe((data) => {
        this.customer = data
        console.log(this.customer)
        this.setValue(this.customer)
        this.initMap(Number(this.customer.latitude) !== 0 ? Number(this.customer.latitude) : 51.505, 
          Number(this.customer.longitude) !== 0 ? Number(this.customer.longitude) : -0.09);
      })
  }

  initMap(lat : number = 51.505, lng : number = -0.09) : void {
    navigator.geolocation.getCurrentPosition((data) => {
      console.log(data.coords)
    });
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
    //let prevMarked : any = {}
    map.on('click', (event : any) => {
      // let lat = event.latlang.lat;
      // let lng = event.latlang.lng;
      // this.latitude = event.latlng.lat.toString();
      // this.longtitude = event.latlng.lng.toString();
      this.form.controls['lat'].setValue(Number(event.latlng.lat));
      this.form.controls['lng'].setValue(Number(event.latlng.lng));
      //console.log(lat + ' - ' + lng)
      if(marker != undefined){
        map.removeLayer(marker)
      }

      marker = L.marker(event.latlng).addTo(map);
    })

    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    let obj = L.Control.geocoder().addTo(map);
    console.log(obj)
  }
  
  toggle(){
    this.form.disabled ? this.form.enable() : this.form.disable()
  }

  submit() : void {
    if(this.form.valid){
      const data = JSON.stringify(this.form.value)
      console.log(data)
      this.onUpdate(data)
    }
  }
  onUpdate(data : any) : void {
    this.btnText = 'Updating...'
    this.customerService.update(data)
      .subscribe((res) => {
        alert(res.message)
        this.btnText = 'Update'
      }, (err) =>  {
        alert('Failed to update')
        console.log(err)
      })
  }
  setValue(customer : any) : void {
    this.form.controls['firstName'].setValue(customer.firstName)
    this.form.controls['lastName'].setValue(customer.lastName)
    this.form.controls['address'].setValue(customer.address)
    this.form.controls['contactNo'].setValue(customer.contactNo)
    this.form.controls['middleName'].setValue(customer.middleName)
    this.form.controls['age'].setValue(customer.age)
    this.form.controls['birthDate'].setValue(customer.birthDate)
    this.form.controls['lat'].setValue(customer.latitude)
    this.form.controls['lng'].setValue(customer.longitude)
  }
}
