import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchReportsComponent } from './branch-reports.component';

describe('BranchReportsComponent', () => {
  let component: BranchReportsComponent;
  let fixture: ComponentFixture<BranchReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
