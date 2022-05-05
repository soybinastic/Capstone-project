import { TestBed } from '@angular/core/testing';

import { RecieveProductService } from './recieve-product.service';

describe('RecieveProductService', () => {
  let service: RecieveProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecieveProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
