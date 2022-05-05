import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-branch-order-products',
  templateUrl: './branch-order-products.component.html',
  styleUrls: ['./branch-order-products.component.css']
})
export class BranchOrderProductsComponent implements OnInit {

  @Input() orderProducts : any[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
