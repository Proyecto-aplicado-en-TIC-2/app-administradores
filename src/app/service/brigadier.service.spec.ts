import { TestBed } from '@angular/core/testing';

import { BrigadierService } from './brigadier.service';

describe('BrigadierService', () => {
  let service: BrigadierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrigadierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
