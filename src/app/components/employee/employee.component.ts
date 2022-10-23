import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
    employees: any[] = []
    constructor(private employeeService: EmployeeService) { }
    ngOnInit(): void {
        this.loadData();
    }
    loadData(): void {
        this.employeeService.getAll()
            .subscribe(data => {
                this.employees = data;
                console.log(this.employees)
            })
    }
}