import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {
  menu: string;
  constructor() { }

  ngOnInit(): void {
  }
  click(val:string){
    this.menu = val;
  }
}
