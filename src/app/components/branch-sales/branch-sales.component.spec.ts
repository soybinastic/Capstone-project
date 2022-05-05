import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSalesComponent } from './branch-sales.component';

describe('BranchSalesComponent', () => {
  let component: BranchSalesComponent;
  let fixture: ComponentFixture<BranchSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
