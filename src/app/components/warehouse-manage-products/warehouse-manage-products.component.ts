import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-warehouse-manage-products',
  templateUrl: './warehouse-manage-products.component.html',
  styleUrls: ['./warehouse-manage-products.component.css']
})
export class WarehouseManageProductsComponent implements OnInit {

  url : string = ""
  constructor(private route : Router) { }

  ngOnInit(): void { 
    this.url = this.route.url
    console.log(this.route.url)
  } 

  onNavigate(url : string){ 
    this.route.navigate(['/ware-house','warehouse-manage-products',url])
    this.url = this.route.url
    console.log(this.route.url)
  }

}
