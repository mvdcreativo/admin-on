import { TestBed } from '@angular/core/testing';

import { LengthUnitService } from './length-unit.service';

describe('LengthUnitService', () => {
  let service: LengthUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LengthUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
