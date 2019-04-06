import { TestBed } from '@angular/core/testing';

import { AcadStudentsService } from './acad-students.service';

describe('AcadStudentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcadStudentsService = TestBed.get(AcadStudentsService);
    expect(service).toBeTruthy();
  });
});
