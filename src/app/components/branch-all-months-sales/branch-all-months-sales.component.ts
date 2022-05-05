import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-branch-all-months-sales',
  templateUrl: './branch-all-months-sales.component.html',
  styleUrls: ['./branch-all-months-sales.component.css']
})
export class BranchAllMonthsSalesComponent implements OnInit {

  @Input() sales : any[] = []
  constructor() { }

  ngOnInit(): void {
    console.log(this.sales)
  }

  dateConverter(date : string) : string {
    let dateToReturn = new Date(date);
    // console.log(dateToReturn.toLocaleDateString())
    return dateToReturn.toLocaleDateString()
  }
}
