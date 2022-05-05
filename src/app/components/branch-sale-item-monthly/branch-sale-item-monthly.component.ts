import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-branch-sale-item-monthly',
  templateUrl: './branch-sale-item-monthly.component.html',
  styleUrls: ['./branch-sale-item-monthly.component.css']
})
export class BranchSaleItemMonthlyComponent implements OnInit {

  saleItems : any[] = []
  message : string = 'Loading...'
  date : Date
  constructor(private saleService : SaleService, private route : ActivatedRoute) { }

  ngOnInit(): void { 
    this.route.queryParamMap.subscribe((param : any)  =>{
      const date = new Date(param.params.date);
      this.date = date;
      this.saleService.getSaleItem(date.toDateString(), 'monthly')
        .subscribe((data) => {
          this.saleItems = data
          console.log(this.saleItems)
          if(this.saleItems.length == 0){
            this.message = 'No data found!'
          }
        })
    })
  }

}
