import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSaleItemMonthlyComponent } from './branch-sale-item-monthly.component';

describe('BranchSaleItemMonthlyComponent', () => {
  let component: BranchSaleItemMonthlyComponent;
  let fixture: ComponentFixture<BranchSaleItemMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSaleItemMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSaleItemMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
