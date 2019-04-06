import { TestBed } from '@angular/core/testing';

import { AcadService } from './acad.service';

describe('AcadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcadService = TestBed.get(AcadService);
    expect(service).toBeTruthy();
  });
});
