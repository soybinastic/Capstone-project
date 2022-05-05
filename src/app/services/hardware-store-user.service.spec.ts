import { TestBed } from '@angular/core/testing';

import { HardwareStoreUserService } from './hardware-store-user.service';

describe('HardwareStoreUserService', () => {
  let service: HardwareStoreUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardwareStoreUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
