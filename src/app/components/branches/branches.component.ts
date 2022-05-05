import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  branches : any[] = []
  constructor(private branchService : BranchService) { }

  ngOnInit(): void {
    this.loadBranches();
  }
  loadBranches(){
    this.branchService.getBranches()
    .subscribe((data)=>{
      this.branches = data
      console.log(this.branches)
    })
  }
}
