import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOrderListComponent } from './branch-order-list.component';

describe('BranchOrderListComponent', () => {
  let component: BranchOrderListComponent;
  let fixture: ComponentFixture<BranchOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
