import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-branch-bestselling-reports',
  templateUrl: './branch-bestselling-reports.component.html',
  styleUrls: ['./branch-bestselling-reports.component.css']
})
export class BranchBestsellingReportsComponent implements OnInit {

  bestSellingReports : any[] = []
  constructor(private saleService : SaleService) { }

  ngOnInit(): void {
    this.loadReports()
  }

  loadReports() : void {
    this.saleService.getReportsByBranch()
      .subscribe((data) => {
        this.bestSellingReports = data
        console.log(this.bestSellingReports)
      })
  }
}
