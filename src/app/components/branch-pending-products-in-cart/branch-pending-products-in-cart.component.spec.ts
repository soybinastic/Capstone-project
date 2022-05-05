import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchPendingProductsInCartComponent } from './branch-pending-products-in-cart.component';

describe('BranchPendingProductsInCartComponent', () => {
  let component: BranchPendingProductsInCartComponent;
  let fixture: ComponentFixture<BranchPendingProductsInCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchPendingProductsInCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchPendingProductsInCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
