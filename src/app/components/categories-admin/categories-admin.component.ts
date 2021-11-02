import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICategory } from 'src/app/models/category-models/category';


@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.css']
})
export class CategoriesAdminComponent implements OnInit {
  @Input() categories : ICategory[] = []
  @Output() addCategoryEvent = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  add(){
    this.addCategoryEvent.emit()
  }

}
