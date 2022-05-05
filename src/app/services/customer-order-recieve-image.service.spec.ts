import { TestBed } from '@angular/core/testing';

import { CustomerOrderRecieveImageService } from './customer-order-recieve-image.service';

describe('CustomerOrderRecieveImageService', () => {
  let service: CustomerOrderRecieveImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOrderRecieveImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
