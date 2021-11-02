import { TestBed } from '@angular/core/testing';

import { MainAdminGuard } from './main-admin.guard';

describe('MainAdminGuard', () => {
  let guard: MainAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MainAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
