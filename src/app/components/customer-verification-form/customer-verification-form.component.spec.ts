import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVerificationFormComponent } from './customer-verification-form.component';

describe('CustomerVerificationFormComponent', () => {
  let component: CustomerVerificationFormComponent;
  let fixture: ComponentFixture<CustomerVerificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerVerificationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerVerificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
