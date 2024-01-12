import { TestBed } from '@angular/core/testing';

import { LeadsReportsService } from './leads-reports.service';

describe('LeadsReportsService', () => {
  let service: LeadsReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadsReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
