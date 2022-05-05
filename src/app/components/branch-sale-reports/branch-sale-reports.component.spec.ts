import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSaleReportsComponent } from './branch-sale-reports.component';

describe('BranchSaleReportsComponent', () => {
  let component: BranchSaleReportsComponent;
  let fixture: ComponentFixture<BranchSaleReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSaleReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSaleReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
