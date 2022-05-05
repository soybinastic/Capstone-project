import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVerificationListComponent } from './customer-verification-list.component';

describe('CustomerVerificationListComponent', () => {
  let component: CustomerVerificationListComponent;
  let fixture: ComponentFixture<CustomerVerificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerVerificationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerVerificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
