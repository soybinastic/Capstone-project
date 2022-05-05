import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-branch-product-details',
  templateUrl: './branch-product-details.component.html',
  styleUrls: ['./branch-product-details.component.css']
})
export class BranchProductDetailsComponent implements OnInit {

  product : any = {}
  constructor(private productService : ProductService, private urlParam : ActivatedRoute) { }

  ngOnInit(): void {
    const hardwareProductId = Number(this.urlParam.snapshot.paramMap.get('hardwareProductId'));
    const branchId = Number(this.urlParam.snapshot.paramMap.get('branchId'));

    this.getProduct(hardwareProductId, branchId);
  }

  getProduct(hardwareProductId : number, branchId : number) : void {
    this.productService.getHardwareProduct(branchId, hardwareProductId)
      .subscribe((data) => {
        this.product = data
        console.log(this.product)
      })
  }
}
