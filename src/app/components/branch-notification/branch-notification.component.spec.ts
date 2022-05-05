import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchNotificationComponent } from './branch-notification.component';

describe('BranchNotificationComponent', () => {
  let component: BranchNotificationComponent;
  let fixture: ComponentFixture<BranchNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
