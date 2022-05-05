import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyRegisteredService } from 'src/app/services/company-registered.service';

@Component({
  selector: 'app-company-registered-detail',
  templateUrl: './company-registered-detail.component.html',
  styleUrls: ['./company-registered-detail.component.css']
})
export class CompanyRegisteredDetailComponent implements OnInit {

  companyRegister : any = {}
  constructor(private companyRegisterService : CompanyRegisteredService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.loadData(id)
  }
  loadData(id : number) : void {
    this.companyRegisterService.get(id)
      .subscribe((data) => {
        this.companyRegister = data
        console.log(this.companyRegister)
      })
  }

}
