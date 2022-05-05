import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOrderProductsComponent } from './branch-order-products.component';

describe('BranchOrderProductsComponent', () => {
  let component: BranchOrderProductsComponent;
  let fixture: ComponentFixture<BranchOrderProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchOrderProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOrderProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
