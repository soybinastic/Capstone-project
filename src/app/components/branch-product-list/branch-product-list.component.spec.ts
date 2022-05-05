import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchProductListComponent } from './branch-product-list.component';

describe('BranchProductListComponent', () => {
  let component: BranchProductListComponent;
  let fixture: ComponentFixture<BranchProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
