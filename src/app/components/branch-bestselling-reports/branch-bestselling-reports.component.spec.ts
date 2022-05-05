import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchBestsellingReportsComponent } from './branch-bestselling-reports.component';

describe('BranchBestsellingReportsComponent', () => {
  let component: BranchBestsellingReportsComponent;
  let fixture: ComponentFixture<BranchBestsellingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchBestsellingReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchBestsellingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
