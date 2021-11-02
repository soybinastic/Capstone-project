import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/category-models/category';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent implements OnInit {
  @Input() category : ICategory
  constructor() { }

  ngOnInit(): void {
  }

}
