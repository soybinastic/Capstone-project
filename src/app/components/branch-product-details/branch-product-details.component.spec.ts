import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchProductDetailsComponent } from './branch-product-details.component';

describe('BranchProductDetailsComponent', () => {
  let component: BranchProductDetailsComponent;
  let fixture: ComponentFixture<BranchProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
