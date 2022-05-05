import { Component, OnInit, Input } from '@angular/core';
import { BestSellingReportModel } from 'src/app/models/bestsellingmodels/bestSellingReport';

@Component({
  selector: 'app-branch-add-bestselling-report',
  templateUrl: './branch-add-bestselling-report.component.html',
  styleUrls: ['./branch-add-bestselling-report.component.css']
})
export class BranchAddBestsellingReportComponent implements OnInit {

  @Input() bestSellingProducts : BestSellingReportModel[]
  constructor() { }

  ngOnInit(): void {
  }

}
