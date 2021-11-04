import { TestBed } from '@angular/core/testing';

import { TransportagentService } from './transportagent.service';

describe('TransportagentService', () => {
  let service: TransportagentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportagentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
