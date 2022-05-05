import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/models/category-models/category';
import { IProduct } from 'src/app/models/product-models/products';
import { AccountService } from 'src/app/services/account.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  branchId : number
  hardwareStoreId : number
  categories : ICategory[] = []
  products : IProduct[] = []
  cartCounter : number = 0
  form : FormGroup
  constructor(private params : ActivatedRoute, private categoryService : CategoryService, private productService : ProductService, private route : Router, private cartService : CartService, 
    private accountService : AccountService, private fb : FormBuilder) { 
      this.form = fb.group({
        searchItem : ['',Validators.required]
      })
    }

  ngOnInit(): void {
    const urlBranchId = this.params.snapshot.paramMap.get('branchId')
    this.branchId = Number(urlBranchId)
    const urlHardwareStoreId = this.params.snapshot.paramMap.get('hardwareStoreId')
    this.hardwareStoreId = Number(urlHardwareStoreId)
    const header = document.querySelector('.categ-header') as HTMLDivElement;
    
    if(!localStorage.getItem('search_item')){
      localStorage.setItem('search_item','')
    }else{
      const value = localStorage.getItem('search_item');
      this.form.controls['searchItem'].setValue(value)
    }

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

    this.loadCategories()
    if(this.accountService.isLoggedIn()){
      this.getProductsInCart()
    }
    
  } 
  getProductsInCart() : void {
    this.cartService.getProductsInCartV2(this.hardwareStoreId, this.branchId)
    .subscribe((data)=>{
      data.forEach((product)=>{
        this.cartCounter += product.productQuantity
      })
    })
  }
  goToCart(){
    this.route.navigate(['/cart',this.hardwareStoreId,this.branchId,'p','none'])
    .then(()=> window.location.reload())
  }
  loadCategories() : void {
    this.categoryService.getCategories(this.hardwareStoreId)
    .subscribe((data)=> {
      this.categories = data
      console.log(this.categories)
    })
  }
  navigate(categoryId: any = 'all'){ 
    this.route.navigate(['products',this.branchId, this.hardwareStoreId,'product-category',categoryId,this.branchId, this.hardwareStoreId])
    .then(()=> { window.location.reload() })
  }
  onSearch() : void {
    const value = this.form.controls['searchItem'].value;
    localStorage.setItem('search_item', value)
    window.location.reload()
  }
}
