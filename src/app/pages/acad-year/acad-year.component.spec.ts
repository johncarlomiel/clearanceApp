import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcadYearComponent } from './acad-year.component';

describe('AcadYearComponent', () => {
  let component: AcadYearComponent;
  let fixture: ComponentFixture<AcadYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcadYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcadYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
