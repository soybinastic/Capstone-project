import { Component, OnInit } from "@angular/core";
import { UserAdminService } from "src/app/services/user-admin.service";

@Component({
    selector: 'registered-companies',
    templateUrl: './registered-companies.component.html',
    styleUrls: ['./registered-companies.component.css']
})
export class RegisteredCompaniesComponent implements OnInit {

    regCompanies: any[] = []
    constructor(private userAdminService: UserAdminService) { }
    ngOnInit(): void {
        this.loadData()
    }
    loadData(): void {
        this.userAdminService.getRegisteredCompanies()
            .subscribe(data => {
                this.regCompanies = data
                console.log(this.regCompanies)
            })
    }
}