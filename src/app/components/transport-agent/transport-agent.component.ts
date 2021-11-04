import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-transport-agent',
  templateUrl: './transport-agent.component.html',
  styleUrls: ['./transport-agent.component.css']
})
export class TransportAgentComponent implements OnInit {

  @Output() closeEvent = new EventEmitter();
  @Output() addEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  add(){
    this.addEvent.emit()
  }
}
