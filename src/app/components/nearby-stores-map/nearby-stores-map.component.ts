import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BranchService } from "src/app/services/branch.service";
declare const L : any
@Component({
    selector : 'neaby-stores',
    styleUrls : ['./nearby-stores-map.component.css'],
    templateUrl : './nearby-stores-map.component.html'
})
export class NearbyStoresMap implements OnInit {
    title : string = "Nearby stores"
    customerLat : number;
    customerLng : number;
    km : number
    constructor(private branchService : BranchService, private activatedRoute : ActivatedRoute){
        this.customerLat = Number(localStorage.getItem("customer_lat"));
        this.customerLng = Number(localStorage.getItem("customer_lng"));
    }
    ngOnInit(): void {
        //this.initMap()
        this.km = this.activatedRoute.snapshot.queryParamMap.get('km') !== null ? Number(this.activatedRoute.snapshot.queryParamMap.get('km')) : 5
        this.loadAllBranches()
    }

    loadAllBranches() : void {
        this.branchService.getAllBranches(this.customerLat, this.customerLng, this.km)
            .subscribe((data) => {
                this.initMap(this.customerLat, this.customerLng, data)
            })
    }
    initMap(lat : number = 51.505, lng : number = -0.09, nearBranches : any[]) : void {
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
        // map.on('click', (event : any) => {
        //   // let lat = event.latlang.lat;
        //   // let lng = event.latlang.lng;
        //   // this.latitude = event.latlng.lat.toString();
        //   // this.longtitude = event.latlng.lng.toString();
        //   //console.log(lat + ' - ' + lng)
        //   if(marker != undefined){
        //     map.removeLayer(marker)
        //   }
    
        //   marker = L.marker(event.latlng).addTo(map);
        // })
        marker.bindPopup("You").openPopup();
        var popup = L.popup()
        .setLatLng([lat, lng])
        .setContent("Youuuuu")
        .openOn(map);

        for(let nearBranch of nearBranches){
            marker = L.marker([Number(nearBranch.latitude), Number(nearBranch.longitude)]).bindPopup(nearBranch.name).openPopup().addTo(map)
            // var popup = L.popup()
            // .setLatLng([Number(nearBranch.latitude), Number(nearBranch.longitude)])
            // .setContent(nearBranch.name)
            // .openOn(map);
        }
    
        L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        let obj = L.Control.geocoder().addTo(map);
        console.log(obj)
      }
}