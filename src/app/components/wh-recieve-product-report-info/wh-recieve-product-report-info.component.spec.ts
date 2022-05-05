import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhRecieveProductReportInfoComponent } from './wh-recieve-product-report-info.component';

describe('WhRecieveProductReportInfoComponent', () => {
  let component: WhRecieveProductReportInfoComponent;
  let fixture: ComponentFixture<WhRecieveProductReportInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhRecieveProductReportInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhRecieveProductReportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
