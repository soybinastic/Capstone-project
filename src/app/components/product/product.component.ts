import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product-models/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product : IProduct
  constructor() { }

  ngOnInit(): void {
  }

}
