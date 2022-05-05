import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-branch-request-list',
  templateUrl: './branch-request-list.component.html',
  styleUrls: ['./branch-request-list.component.css']
})
export class BranchRequestListComponent implements OnInit {

  requests : any[] = []
  constructor(private requestService : RequestService) { }

  ngOnInit(): void {
    this.loadRequests()
  }

  showToggle(id : string) : void {
    const reqs = document.getElementById(id) as HTMLDivElement;
    reqs.hidden = !reqs.hidden
  }
  loadRequests() : void {
    this.requestService.getBranchRequests()
      .subscribe((data) => {
        this.requests = data
        console.log(this.requests)
      })
  }
}
