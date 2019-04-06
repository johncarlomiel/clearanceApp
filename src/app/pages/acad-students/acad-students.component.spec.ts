import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcadStudentsComponent } from './acad-students.component';

describe('AcadStudentsComponent', () => {
  let component: AcadStudentsComponent;
  let fixture: ComponentFixture<AcadStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcadStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcadStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
