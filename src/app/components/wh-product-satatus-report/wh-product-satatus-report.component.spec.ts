import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhProductSatatusReportComponent } from './wh-product-satatus-report.component';

describe('WhProductSatatusReportComponent', () => {
  let component: WhProductSatatusReportComponent;
  let fixture: ComponentFixture<WhProductSatatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhProductSatatusReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhProductSatatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
