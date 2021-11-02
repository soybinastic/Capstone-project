import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(private accountService : AccountService, private route : Router){}
  title = 'construction-material-ordering-frontend';
  ngOnInit(): void {
    // if(!this.accountService.isLoggedIn()){
    //   this.route.navigate(['/welcome'])
    // }
  }
}
