import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSendRequestComponent } from './branch-send-request.component';

describe('BranchSendRequestComponent', () => {
  let component: BranchSendRequestComponent;
  let fixture: ComponentFixture<BranchSendRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSendRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSendRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
