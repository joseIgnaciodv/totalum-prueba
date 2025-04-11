import { TestBed } from '@angular/core/testing';

import { TotalumApiService } from './totalum-api.service';

describe('TotalumApiService', () => {
  let service: TotalumApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalumApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
