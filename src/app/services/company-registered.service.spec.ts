import { TestBed } from '@angular/core/testing';

import { CompanyRegisteredService } from './company-registered.service';

describe('CompanyRegisteredService', () => {
  let service: CompanyRegisteredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyRegisteredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
