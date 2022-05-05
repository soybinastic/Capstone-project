import { TestBed } from '@angular/core/testing';

import { WarehouseProductStatusReportService } from './warehouse-product-status-report.service';

describe('WarehouseProductStatusReportService', () => {
  let service: WarehouseProductStatusReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseProductStatusReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
