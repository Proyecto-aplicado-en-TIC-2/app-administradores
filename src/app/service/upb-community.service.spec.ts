import { TestBed } from '@angular/core/testing';

import { UpbCommunityService } from './upb-community.service';

describe('UpbCommunityService', () => {
  let service: UpbCommunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpbCommunityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
