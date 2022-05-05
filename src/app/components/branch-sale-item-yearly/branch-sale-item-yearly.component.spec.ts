import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSaleItemYearlyComponent } from './branch-sale-item-yearly.component';

describe('BranchSaleItemYearlyComponent', () => {
  let component: BranchSaleItemYearlyComponent;
  let fixture: ComponentFixture<BranchSaleItemYearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSaleItemYearlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSaleItemYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
