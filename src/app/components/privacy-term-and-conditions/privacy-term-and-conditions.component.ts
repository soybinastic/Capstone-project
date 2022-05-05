import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-term-and-conditions',
  templateUrl: './privacy-term-and-conditions.component.html',
  styleUrls: ['./privacy-term-and-conditions.component.css']
})
export class PrivacyTermAndConditionsComponent implements OnInit {

  date : Date = new Date()
  constructor() { }

  ngOnInit(): void {
  }

}
