import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/services/branch.service';

declare const L : any
@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit {

  branch : any
  branchId : any
  isBtnDisabled : boolean
  btnText : string = "Update"
  errorMessage : string = ''
  isInputValid : boolean = true
  isCheck : boolean = true
  form : FormGroup;
  imageFile : File
  constructor(private fb : FormBuilder, private branchService : BranchService, private urlParam : ActivatedRoute) { 
    this.form = fb.group({
      id : ['',Validators.required],
      branchName : ['',Validators.required],
      address : ['', Validators.required],
      isActive : [this.isCheck],
      range : ['', Validators.required],
      lat : ['', Validators.required],
      lng : ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.branchId = this.urlParam.snapshot.paramMap.get('branchId')
    this.loadBranchToInput(Number(this.branchId))
    //this.initMap();
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
      this.form.controls["lat"].setValue(Number(event.latlng.lat));
      this.form.controls["lng"].setValue(Number(event.latlng.lng));
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
  update(){
    if(this.isValid()){
      
      const data = JSON.stringify(this.form.value)
      console.log(data)
      this.updateBranch(this.getData(), this.branchId)
    }else{
      this.isInputValid = false
      this.errorMessage = 'Invalid Input.'
    }
  } 
  loadBranchToInput(branchId : number){
    this.branchService.getBranch(branchId)
      .subscribe((data)=>{
        this.branch = data;
        this.initMap(Number(this.branch.latitude) !== 0 ? Number(this.branch.latitude) : 51.505,
           Number(this.branch.longitude) !== 0 ? Number(this.branch.longitude) : -0.09);
        console.log(data)
        this.form.controls['id'].setValue(data.id)
        this.form.controls['branchName'].setValue(data.name)
        this.form.controls['address'].setValue(data.address)
        this.form.controls['isActive'].setValue(data.isActive)
        this.form.controls['lat'].setValue(data.latitude)
        this.form.controls['lng'].setValue(data.longitude)
        this.form.controls['range'].setValue(data.range)
      })
  }
  getData() : FormData {
    const formData = new FormData();
    formData.append('id', this.form.controls['id'].value);
    formData.append('branchName', this.form.controls['branchName'].value);
    formData.append('address', this.form.controls['address'].value);
    formData.append('isActive', this.form.controls['isActive'].value);
    formData.append('lat', this.form.controls['lat'].value);
    formData.append('lng', this.form.controls['lng'].value);
    formData.append('range', this.form.controls['range'].value);
    if(this.imageFile != null){
      formData.append('image', this.imageFile, this.imageFile.name);
    }
    return formData;
  }
  updateBranch(data : any, branchId : number){
    this.isBtnDisabled = true;
    this.btnText = "Updating..."
    this.branchService.updateBranch(data, branchId)
    .subscribe((res)=>{
      this.isBtnDisabled = false;
      this.btnText = "Updated"
      if(res.success == 1){
        alert(res.message)
        this.isInputValid = true;
        this.errorMessage = ''
      }
    }, (err)=>{
      this.isInputValid = false
      this.errorMessage = JSON.stringify(err).toString();
      this.btnText = "Update"
    })
  }
  onChange(event : any){
    const value = this.form.controls['isActive'].value.toString();
    this.isCheck = value == 'true'
    //this.isCheck = !this.isCheck
    console.log(this.isCheck)
    this.form.controls['isActive'].setValue(this.isCheck);
  }
  isValid():boolean{
    return this.form.controls['branchName'].value?.length > 0 && this.form.controls['address']
    .value?.length > 0;
  }
  selectedImageFile(event : any) : void {
    let file = <File>event.target.files[0];
    this.imageFile = file;
  }

  
}
