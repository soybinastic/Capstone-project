import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAddBestsellingReportComponent } from './branch-add-bestselling-report.component';

describe('BranchAddBestsellingReportComponent', () => {
  let component: BranchAddBestsellingReportComponent;
  let fixture: ComponentFixture<BranchAddBestsellingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchAddBestsellingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchAddBestsellingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
