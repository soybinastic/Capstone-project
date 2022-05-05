import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchBestsellingProductsComponent } from './branch-bestselling-products.component';

describe('BranchBestsellingProductsComponent', () => {
  let component: BranchBestsellingProductsComponent;
  let fixture: ComponentFixture<BranchBestsellingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchBestsellingProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchBestsellingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
