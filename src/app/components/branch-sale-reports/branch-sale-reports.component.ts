import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-branch-sale-reports',
  templateUrl: './branch-sale-reports.component.html',
  styleUrls: ['./branch-sale-reports.component.css']
})
export class BranchSaleReportsComponent implements OnInit {

  saleReports : any[] = []
  constructor(private saleService : SaleService) { }

  ngOnInit(): void {
    this.laodSaleReports()
  }

  laodSaleReports() : void {
    this.saleService.getSaleReports()
      .subscribe((data) => {
        this.saleReports = data
        console.log(this.saleReports)
      })
  }
}
