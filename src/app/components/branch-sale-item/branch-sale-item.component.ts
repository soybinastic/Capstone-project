import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-branch-sale-item',
  templateUrl: './branch-sale-item.component.html',
  styleUrls: ['./branch-sale-item.component.css']
})
export class BranchSaleItemComponent implements OnInit {

  saleItems : any[] = []
  date : Date;
  message : string = 'Loading...'
  constructor(private saleService : SaleService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param: any) => {
      const dateParam = param.params.date;
      const date = new Date(dateParam)
      console.log(date)
      this.date = date;
      this.saleService.getSaleItem(date.toDateString(), 'daily')
        .subscribe((data) => {
          this.saleItems = data
          console.log(this.saleItems)
          if(this.saleItems.length == 0){
            this.message = 'No data found!'
          }
        })
    })
  }

  stringDate() : string {
    return this.date.toLocaleDateString()
  }
}
