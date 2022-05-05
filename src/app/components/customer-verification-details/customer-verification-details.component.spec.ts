import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVerificationDetailsComponent } from './customer-verification-details.component';

describe('CustomerVerificationDetailsComponent', () => {
  let component: CustomerVerificationDetailsComponent;
  let fixture: ComponentFixture<CustomerVerificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerVerificationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerVerificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
