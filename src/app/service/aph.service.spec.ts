import { TestBed } from '@angular/core/testing';

import { AphService } from './aph.service';

describe('AphService', () => {
  let service: AphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
