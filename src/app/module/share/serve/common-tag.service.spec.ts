import { TestBed } from '@angular/core/testing';

import { CommonTagService } from './common-tag.service';

describe('CommonTagService', () => {
  let service: CommonTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
