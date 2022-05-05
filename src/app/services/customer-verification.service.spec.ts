import { TestBed } from '@angular/core/testing';

import { CustomerVerificationService } from './customer-verification.service';

describe('CustomerVerificationService', () => {
  let service: CustomerVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
