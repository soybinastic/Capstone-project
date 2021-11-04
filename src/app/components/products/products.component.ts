import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/models/category-models/category';
import { IProduct } from 'src/app/models/product-models/products';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  hardwareStoreId : number
  categories : ICategory[] = []
  products : IProduct[] = []
  cartCounter : number = 0
  constructor(private params : ActivatedRoute, private categoryService : CategoryService, private productService : ProductService, private route : Router, private cartService : CartService) { }

  ngOnInit(): void {
    const storeId = this.params.snapshot.paramMap.get('hardwareStoreId')
    this.hardwareStoreId = Number(storeId)
    
    this.categoryService.getCategories(this.hardwareStoreId)
    .subscribe((data)=> {
      this.categories = data
      console.log(this.categories)
    })
    const header = document.querySelector('.categ-header') as HTMLDivElement;
    
    window.addEventListener('scroll', ()=>{
      if(window.scrollY >= 74.44444274902344){
        header.classList.add('fix')
      }else{
        header.classList.remove('fix')
      } 
    }) 

    const cartButton = document.querySelector('.cart') as HTMLButtonElement;
    const cartProductNumber = document.querySelector('.prod-count') as HTMLSpanElement;
    cartButton.addEventListener('mouseover', ()=>{
      cartProductNumber.classList.add('prod-count-red')
    }) 
    cartButton.addEventListener('mouseout',()=>{
      cartProductNumber.classList.remove('prod-count-red')
    }) 

    this.cartService.getProductsInCart(this.hardwareStoreId)
    .subscribe((data)=>{
      data.forEach((product)=>{
        this.cartCounter += product.productQuantity
      })
    })
    
  } 

  goToCart(){
    this.route.navigate(['/cart',this.hardwareStoreId,'p','none'])
    .then(()=> window.location.reload())
  }

  navigate(categoryId: any = 'all'){ 
    this.route.navigate(['/hardware-store-page',this.hardwareStoreId,'products',this.hardwareStoreId,'product-category',categoryId,this.hardwareStoreId])
    .then(()=> { window.location.reload() })
  }
  
}
