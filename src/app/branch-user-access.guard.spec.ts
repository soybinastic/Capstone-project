import { TestBed } from '@angular/core/testing';

import { BranchUserAccessGuard } from './branch-user-access.guard';

describe('BranchUserAccessGuard', () => {
  let guard: BranchUserAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BranchUserAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
