import { TestBed } from '@angular/core/testing';

import { HardwareStoreService } from './hardware-store.service';

describe('HardwareStoreService', () => {
  let service: HardwareStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardwareStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
