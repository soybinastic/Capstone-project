import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/product-models/products';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  categoryId : number
  hardwareStoreId : number
  categoryName : string
  products : IProduct[] = []
  constructor(private routeParam : ActivatedRoute, private productService : ProductService, private categoryService : CategoryService) { }

  ngOnInit(): void {
    const categoryIdParam = this.routeParam.snapshot.paramMap.get('categoryId')
    const hardwareStoreIdParam = this.routeParam.snapshot.paramMap.get('hardwareStoreId')
    this.categoryId = Number(categoryIdParam)
    this.hardwareStoreId = Number(hardwareStoreIdParam)
    console.log('Category Id: '+categoryIdParam+'\nHardware Store Id: '+hardwareStoreIdParam)
    // if(categoryIdParam == 'all'){
    //   console.log(categoryIdParam)
    // }else{
    //   console.log(categoryIdParam)
    // }
    if(categoryIdParam == 'all'){
      this.productService.getAllProductOfStore(this.hardwareStoreId)
      .subscribe((data)=>{
        this.products = data
        console.log('All')
        console.log(this.products)
      })
    }else{
      this.productService.getProductsByCategory(this.hardwareStoreId, this.categoryId)
      .subscribe((data)=>{
        this.products = data;
        console.log('With Id')
        console.log(this.products)
      }) 
      this.categoryService.getCategory(this.hardwareStoreId, this.categoryId)
      .subscribe((data)=> this.categoryName = data.categoryName)
    }
   
  }

}
