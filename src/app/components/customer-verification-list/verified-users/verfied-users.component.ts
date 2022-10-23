import { Component, OnInit } from "@angular/core";
import { UserAdminService } from "src/app/services/user-admin.service";

@Component({
    selector: 'verified-users',
    templateUrl: './verfied-users.component.html',
    styleUrls: ['./verfied-users.component.css']
})
export class VerifiedUsersComponent implements OnInit {

    verifiedUsers: any[] = []
    constructor(private userAdminService: UserAdminService) { }
    ngOnInit(): void {
        this.loadData();
    }
    loadData(): void {
        this.userAdminService.getVerifiedUsers()
            .subscribe(data => {
                this.verifiedUsers = data
                console.log(this.verifiedUsers)
            })
    }
}