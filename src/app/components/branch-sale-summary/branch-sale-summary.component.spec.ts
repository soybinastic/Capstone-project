import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSaleSummaryComponent } from './branch-sale-summary.component';

describe('BranchSaleSummaryComponent', () => {
  let component: BranchSaleSummaryComponent;
  let fixture: ComponentFixture<BranchSaleSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSaleSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSaleSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
