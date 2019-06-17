import { TestBed } from '@angular/core/testing';

import { ExmapleService } from './exmaple.service';

describe('ExmapleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExmapleService = TestBed.get(ExmapleService);
    expect(service).toBeTruthy();
  });
});
