import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-branch-display',
  templateUrl: './branch-display.component.html',
  styleUrls: ['./branch-display.component.css']
})
export class BranchDisplayComponent implements OnInit {

  @Input() branch : any = {}
  @Output() onGo  = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  go() : void {
    this.onGo.emit(this.branch)
  }
}
