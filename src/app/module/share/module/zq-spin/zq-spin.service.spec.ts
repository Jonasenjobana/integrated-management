import { TestBed } from '@angular/core/testing';

import { ZqSpinService } from './zq-spin.service';

describe('ZqSpinService', () => {
  let service: ZqSpinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZqSpinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
