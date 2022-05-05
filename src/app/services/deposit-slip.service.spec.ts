import { TestBed } from '@angular/core/testing';

import { DepositSlipService } from './deposit-slip.service';

describe('DepositSlipService', () => {
  let service: DepositSlipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepositSlipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
