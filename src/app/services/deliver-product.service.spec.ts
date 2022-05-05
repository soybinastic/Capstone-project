import { TestBed } from '@angular/core/testing';

import { DeliverProductService } from './deliver-product.service';

describe('DeliverProductService', () => {
  let service: DeliverProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
