import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin : boolean;
  role: string;
  constructor(private accountService: AccountService, private route: Router) { }

  ngOnInit(): void { 
    this.isLogin = this.accountService.isLoggedIn();
    if(this.isLogin)
      this.role = this.accountService.getUserRole();
  } 

  logOut(){
    this.accountService.logOut(this.accountService.getToken()).subscribe((res)=>{
      if(res.success == 1)
      {
        alert(res.message)
        this.accountService.removeToken()
        localStorage.clear()
        this.route.navigate(['/login']).then(()=> window.location.reload())
      }
    })
  }

}
