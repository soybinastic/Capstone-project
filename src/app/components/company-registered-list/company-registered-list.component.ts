import { Component, OnInit } from '@angular/core';
import { CompanyRegisteredService } from 'src/app/services/company-registered.service';

@Component({
  selector: 'app-company-registered-list',
  templateUrl: './company-registered-list.component.html',
  styleUrls: ['./company-registered-list.component.css']
})
export class CompanyRegisteredListComponent implements OnInit {

  isdeleteEnable : boolean = true
  companyRegisters : any[] = []
  message : string = 'Loading...'
  constructor(private companyRegisterService : CompanyRegisteredService) { }

  ngOnInit(): void {
    this.loadData()
  }
  delete(id : number) : void {
    this.isdeleteEnable = false
    this.companyRegisterService.delete(id)
      .subscribe((res) =>{
        this.isdeleteEnable = true
        this.companyRegisters = this.companyRegisters.filter(c => c.id != id)
      }, (err) => {
        this.isdeleteEnable = true
      })
  }
  loadData() : void {
    this.companyRegisterService.getAll()  
      .subscribe((data) => {
        this.companyRegisters = data
        console.log(this.companyRegisters)
        if(this.companyRegisters.length == 0){
          this.message = 'No Data Found!'
        }
      })
  }
}
