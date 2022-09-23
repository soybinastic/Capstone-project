import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product-models/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // @Input() product : IProduct
  @Input() product : any = {}
  prevUrl : string
  constructor(private route : Router) { }

  ngOnInit(): void {
    console.log(this.route.url)
    this.prevUrl = this.route.url
    console.log(this.product)
  }

}
