import { TestBed } from '@angular/core/testing';

import { StoreAdminAccessGuard } from './store-admin-access.guard';

describe('StoreAdminAccessGuard', () => {
  let guard: StoreAdminAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StoreAdminAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
