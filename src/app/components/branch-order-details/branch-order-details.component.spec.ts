import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOrderDetailsComponent } from './branch-order-details.component';

describe('BranchOrderDetailsComponent', () => {
  let component: BranchOrderDetailsComponent;
  let fixture: ComponentFixture<BranchOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchOrderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
