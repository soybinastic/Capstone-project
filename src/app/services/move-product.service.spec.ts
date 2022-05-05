import { TestBed } from '@angular/core/testing';

import { MoveProductService } from './move-product.service';

describe('MoveProductService', () => {
  let service: MoveProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
