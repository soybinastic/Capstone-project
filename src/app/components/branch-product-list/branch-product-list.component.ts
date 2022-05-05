import { Component, OnInit } from '@angular/core';
import { HardwareStoreUserService } from 'src/app/services/hardware-store-user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-branch-product-list',
  templateUrl: './branch-product-list.component.html',
  styleUrls: ['./branch-product-list.component.css']
})
export class BranchProductListComponent implements OnInit {

  products : any [] = []
  productsSource : any[] = []
  constructor(private productService : ProductService, private hardwareStoreUserService : HardwareStoreUserService) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() : void {
    this.hardwareStoreUserService.getStoreAdminInfo()
      .subscribe((data) => {
        this.productService.getHardwareProducts(Number(data.branchId))
          .subscribe((data) => {
            this.products = data
            this.productsSource = data
            console.log(this.products)
          })
      })
  }

  onSearch(event : any) : void {
    let value : string = event.target.value.toString();
    value = value.toLocaleLowerCase();

    this.products = this.productsSource.filter((val) => {
      return val.name.toString().toLocaleLowerCase().includes(value)
    }) 
    if(value.length == 0){
      this.products = this.productsSource
    }
  }
}
