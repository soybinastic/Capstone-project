import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhNotificationComponent } from './wh-notification.component';

describe('WhNotificationComponent', () => {
  let component: WhNotificationComponent;
  let fixture: ComponentFixture<WhNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
