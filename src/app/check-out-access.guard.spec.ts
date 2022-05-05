import { TestBed } from '@angular/core/testing';

import { CheckOutAccessGuard } from './check-out-access.guard';

describe('CheckOutAccessGuard', () => {
  let guard: CheckOutAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckOutAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
