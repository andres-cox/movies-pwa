import { TestBed } from '@angular/core/testing';

import { JustwatchApiService } from './justwatch-api.service';

describe('JustwatchApiService', () => {
  let service: JustwatchApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JustwatchApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
