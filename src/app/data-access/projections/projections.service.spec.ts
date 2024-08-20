import { TestBed } from '@angular/core/testing';

import { ProjectionsService } from './projections.service';

describe('ProjectionsService', () => {
  let service: ProjectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
