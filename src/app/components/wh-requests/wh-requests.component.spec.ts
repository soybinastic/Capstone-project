import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhRequestsComponent } from './wh-requests.component';

describe('WhRequestsComponent', () => {
  let component: WhRequestsComponent;
  let fixture: ComponentFixture<WhRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
