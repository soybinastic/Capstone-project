import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHardwareStore } from 'src/app/models/hardware-store-models/hardwarestore';
import { AccountService } from 'src/app/services/account.service';
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
  constructor(private params : ActivatedRoute, private hardwareStoreService : HardwareStoreService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.isLogged =  this.accountService.isLoggedIn()
    const storeId = this.params.snapshot.paramMap.get('hardwareStoreId')
    this.hardwareStoreId = Number(storeId)
    this.hardwareStoreService.getHardwareStoreById(this.hardwareStoreId)
    .subscribe((data)=>{
      this.hardwareStore = data
      console.log(this.hardwareStore)
    })
  }

}
