import { TestBed } from '@angular/core/testing';

import { WarehouseAccessGuard } from './warehouse-access.guard';

describe('WarehouseAccessGuard', () => {
  let guard: WarehouseAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WarehouseAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
