import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAllMonthsSalesComponent } from './branch-all-months-sales.component';

describe('BranchAllMonthsSalesComponent', () => {
  let component: BranchAllMonthsSalesComponent;
  let fixture: ComponentFixture<BranchAllMonthsSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchAllMonthsSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchAllMonthsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
