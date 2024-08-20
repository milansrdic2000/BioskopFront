import { TestBed } from '@angular/core/testing';

import { BaseDataAccessService } from './base-data-access.service';

describe('BaseDataAccessService', () => {
  let service: BaseDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
