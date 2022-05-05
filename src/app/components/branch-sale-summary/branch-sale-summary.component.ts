import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-branch-sale-summary',
  templateUrl: './branch-sale-summary.component.html',
  styleUrls: ['./branch-sale-summary.component.css']
})
export class BranchSaleSummaryComponent implements OnInit {

  date : Date
  summarySales : any = {}
  constructor(private route : ActivatedRoute, private saleService : SaleService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param : any) => {
      // console.log(param.get('date'))
      // console.log('PARSED : ' + param.params.date)
      const date = param.params.date
      const dateParam = new Date(date)
      console.log(dateParam)
      this.saleService.getMonthSalesSummary(dateParam.toDateString())
        .subscribe((data) => {
          this.summarySales = data
          console.log(this.summarySales)
        })
    })
  }
  convertToDateString(date : string) : string {
    let dateSale = new Date(date)
    return dateSale.toLocaleDateString();
  }
}
