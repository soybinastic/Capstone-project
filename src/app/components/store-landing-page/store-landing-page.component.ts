import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHardwareStore } from 'src/app/models/hardware-store-models/hardwarestore';
import { AccountService } from 'src/app/services/account.service';
import { BranchService } from 'src/app/services/branch.service';
import { HardwareStoreService } from 'src/app/services/hardware-store.service';

@Component({
  selector: 'app-store-landing-page',
  templateUrl: './store-landing-page.component.html',
  styleUrls: ['./store-landing-page.component.css']
})
export class StoreLandingPageComponent implements OnInit {

  hardwareStoreId : number
  hardwareStore : IHardwareStore
  isLogged : boolean
  branches : any[] = []
  constructor(private params : ActivatedRoute, private route : Router,private hardwareStoreService : HardwareStoreService, private accountService: AccountService, private branchService : BranchService) { }

  ngOnInit(): void {
    this.isLogged =  this.accountService.isLoggedIn()
    const storeId = this.params.snapshot.paramMap.get('hardwareStoreId')
    this.hardwareStoreId = Number(storeId)
    this.hardwareStoreService.getHardwareStoreById(this.hardwareStoreId)
    .subscribe((data)=>{
      this.hardwareStore = data
      console.log(this.hardwareStore)
    }) 

    this.loadBranches()
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

}
