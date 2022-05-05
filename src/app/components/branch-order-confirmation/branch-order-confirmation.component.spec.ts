import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOrderConfirmationComponent } from './branch-order-confirmation.component';

describe('BranchOrderConfirmationComponent', () => {
  let component: BranchOrderConfirmationComponent;
  let fixture: ComponentFixture<BranchOrderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchOrderConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
