import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-wh-bestselling-product-reports',
  templateUrl: './wh-bestselling-product-reports.component.html',
  styleUrls: ['./wh-bestselling-product-reports.component.css']
})
export class WhBestsellingProductReportsComponent implements OnInit {

  bestSellingReports : any[] = []
  constructor(private saleService : SaleService) { }

  ngOnInit(): void {
    this.loadReports()
  }

  loadReports() : void {
    this.saleService.getReportsByWarehouse()
      .subscribe((data) => {
        this.bestSellingReports = data
        console.log(this.bestSellingReports)
      })
  }
}
