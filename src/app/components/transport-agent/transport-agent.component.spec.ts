import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportAgentComponent } from './transport-agent.component';

describe('TransportAgentComponent', () => {
  let component: TransportAgentComponent;
  let fixture: ComponentFixture<TransportAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
