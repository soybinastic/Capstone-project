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
  branchId : number
  categoryName : string
  hardwareStoreId : number
  // products : IProduct[] = []
  source : any[] = []
  products : any[] = []
  constructor(private routeParam : ActivatedRoute, private productService : ProductService, private categoryService : CategoryService) { }

  ngOnInit(): void {
    const urlHardwareStoreId = this.routeParam.snapshot.paramMap.get('hardwareStoreId')
    const categoryIdParam = this.routeParam.snapshot.paramMap.get('categoryId')
    const branchIdParam = this.routeParam.snapshot.paramMap.get('branchId')
    this.hardwareStoreId = Number(urlHardwareStoreId)
    this.categoryId = Number(categoryIdParam)
    this.branchId = Number(branchIdParam)
    console.log('Category Id: '+categoryIdParam+'\nHardware Store Id: '+branchIdParam)

   
    
    // if(categoryIdParam == 'all'){
    //   console.log(categoryIdParam)
    // }else{
    //   console.log(categoryIdParam)
    // }
    if(categoryIdParam == 'all'){
      // this.productService.getAllProductOfStore(this.branchId)
      // .subscribe((data)=>{
      //   this.products = data
      //   console.log('All')
      //   console.log(this.products)
      // }) 
      this.loadAllProducts()
    }else{
      // this.productService.getProductsByCategory(this.branchId, this.categoryId)
      // .subscribe((data)=>{
      //   this.products = data;
      //   console.log('With Id')
      //   console.log(this.products)
      // }) 
      this.loadAllProductsWithCategory()
      this.categoryService.getCategory(this.hardwareStoreId, this.categoryId)
      .subscribe((data)=> this.categoryName = data.categoryName)
    }
   
  } 
  loadAllProducts() : void {
    this.productService.getHardwareProducts(this.branchId)
      .subscribe((data) => {
        this.products = data
        this.source = data
        const value = localStorage.getItem('search_item');
        if(!localStorage.getItem('search_item')){
          this.products = this.source
        }else{
          this.products = this.source.filter((val) => {
            return val.name.toString().toLocaleLowerCase().includes(value?.toLocaleLowerCase())
          }) 
        }
        console.log(this.products)
      })
  } 

  loadAllProductsWithCategory() : void {
    this.productService.getHardwareProductByCategory(this.branchId, this.categoryId)
      .subscribe((data) => {
        this.products = data
        this.source = data
        const value = localStorage.getItem('search_item');
        if(!localStorage.getItem('search_item')){
          this.products = this.source
        }else{
          this.products = this.source.filter((val) => {
            return val.name.toString().toLocaleLowerCase().includes(value?.toLocaleLowerCase())
          }) 
        }
        console.log(this.products)
        console.log(this.products)
      })
  }

}
