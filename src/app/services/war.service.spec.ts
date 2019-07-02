import { TestBed } from '@angular/core/testing';

import { WarService } from './war.service';

describe('WarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarService = TestBed.get(WarService);
    expect(service).toBeTruthy();
  });
});
