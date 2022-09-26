import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHardwareStore } from 'src/app/models/hardware-store-models/hardwarestore';
import { AccountService } from 'src/app/services/account.service';
import { BranchService } from 'src/app/services/branch.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ControlService } from 'src/app/services/control.service';
import { HardwareStoreService } from 'src/app/services/hardware-store.service';

@Component({
  selector: 'app-store-landing-page',
  templateUrl: './store-landing-page.component.html',
  styleUrls: ['./store-landing-page.component.css']
})
export class StoreLandingPageComponent implements OnInit {

  hardwareStoreId : number
  branchId : number
  hardwareStore : IHardwareStore
  isLogged : boolean
  branch:any
  branches : any[] = []
  categories : any[] = []
  count : number = 0
  constructor(private params : ActivatedRoute, private route : Router,private hardwareStoreService : HardwareStoreService, 
    private accountService: AccountService, private branchService : BranchService, 
    private categoryService : CategoryService, 
    private cartService : CartService, private controlService : ControlService) { }

  ngOnInit(): void {
    this.isLogged =  this.accountService.isLoggedIn()
    const storeId = this.params.snapshot.paramMap.get('hardwareStoreId')
    this.hardwareStoreId = Number(storeId)
    const branch_id = this.params.snapshot.paramMap.get('branchId')
    this.branchId = Number(branch_id)
    if(this.isLogged){
      this.loadProductsInCart()
    }
    this.loadBranch();
    this.loadCatgeories()
    // this.hardwareStoreService.getHardwareStoreById(this.hardwareStoreId)
    // .subscribe((data)=>{
    //   this.hardwareStore = data
    //   console.log(this.hardwareStore)
    // }) 

    // this.loadBranches()
  } 
  loadProductsInCart() : void {
    this.cartService.getProductsInCartV2(this.hardwareStoreId, this.branchId)
      .subscribe(data => {
        data.cartItems.forEach(product => {
          this.count += product.productQuantity;
        })
      })
  }
  go(data:any) : void {
    console.log(data.id) 
    const branchId = data.id;
    this.route.navigate(['products',branchId,this.hardwareStoreId,'product-category','all',branchId, this.hardwareStoreId])
  }
  loadBranches() : void {
    this.branchService.getBranchesByHardwareStoreId(this.hardwareStoreId)
      .subscribe((data) => {
        this.branches = data
        console.log(this.branches)
      })
  }
  loadCatgeories() : void {
    this.categoryService.getCategories(this.hardwareStoreId)
      .subscribe(data => {
        this.categories = data
        console.log(this.categories)
      })
  }
  loadBranch() : void {
    this.branchService.getBranch(this.branchId)
      .subscribe((data) => {
        this.branch = data;
        console.log(this.branch)
      })
      
  }

  getImageUrl() : string {
    return "'url('http://fastlinehardware-001-site1.htempurl.com/" + this.branch.image + "')'"
  }
  onSearchProduct(event : any) : void {
    const val = event.target.value;
    this.controlService.search(val)
  }

}
