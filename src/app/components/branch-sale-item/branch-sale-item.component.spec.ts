import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSaleItemComponent } from './branch-sale-item.component';

describe('BranchSaleItemComponent', () => {
  let component: BranchSaleItemComponent;
  let fixture: ComponentFixture<BranchSaleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSaleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSaleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
