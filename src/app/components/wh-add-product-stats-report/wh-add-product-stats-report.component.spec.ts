import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhAddProductStatsReportComponent } from './wh-add-product-stats-report.component';

describe('WhAddProductStatsReportComponent', () => {
  let component: WhAddProductStatsReportComponent;
  let fixture: ComponentFixture<WhAddProductStatsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhAddProductStatsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhAddProductStatsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
