import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
    selector: 'create-employee',
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

    btnText: string = "Create"
    disable: boolean = false;
    form: FormGroup
    constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
        this.form = fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(5)]],
            confirmPassword: ['', Validators.required],
            role: ['', Validators.required]
        })
    }
    ngOnInit(): void {

    }
    onSelectedRole(event: any): void {
        console.log(event.target.value)
        const value = event.target.value;
        this.form.controls['role'].setValue(value)
    }
    onCreate(): void {
        if (this.form.valid) {
            const data = JSON.stringify(this.form.value);
            console.log(data)
            this.register(data);
        }
    }

    register(data: any): void {
        this.btnText = "Creating..."
        this.disable = true
        this.employeeService.register(data)
            .subscribe(res => {
                this.btnText = "Create"
                this.disable = false
                alert('Successfully registered')
            }, err => {
                this.btnText = "Create"
                alert('Failed to register')
            })
    }
}