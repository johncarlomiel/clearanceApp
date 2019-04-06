import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { AcadStudentsService } from 'src/app/services/acad-students.service';

@Component({
  selector: 'app-acad-students',
  templateUrl: './acad-students.component.html',
  styleUrls: ['./acad-students.component.css']
})
export class AcadStudentsComponent implements OnInit {
  @Input('ay_id') ay_id: number;
  p: number = 1;
  studentPage: number = 1;
  isAddingStudent = false;
  students: Array<any>;
  acadStudents: Array<any>;
  selectedStudentEvents: Object;
  isViewingStudentEvents = false;
  constructor(
    private studentService: StudentService,
    private acadStudentService: AcadStudentsService
  ) { }

  ngOnInit() {
    this.getAcadStudents();

  }
  submitPayment(studentEventInfo, amount) {
    if (amount > studentEventInfo.balance) {
      alert("You exceeded the event full amount");
    } else {
      this.acadStudentService.updatePayment({ studentEventInfo, amount }).subscribe((responseData) => {
        this.viewPayment(studentEventInfo.std_id);

      }, (err) => console.log(err));
    }
  }

  viewPayment(std_id) {
    this.acadStudentService.getStudent(std_id).subscribe((responseData) => {
      this.selectedStudentEvents = {
        std_id: std_id,
        events: responseData
      };
      this.isViewingStudentEvents = true;

    }, (err) => console.log(err));
  }

  getAcadStudents() {
    this.acadStudentService.getStudents(this.ay_id).subscribe((responseData) => {
      this.acadStudents = responseData;
      console.log(this.acadStudents)
      this.getStudents();
    }, (err) => console.log(err));
  }

  getStudents() {
    let excludedStudents = [];
    this.acadStudents.forEach((element) => {
      excludedStudents.push(element.id);
    });
    this.studentService.getStudentsNotInAY(excludedStudents).subscribe((responseData) => {

      this.students = responseData;
      console.log(this.students);
      this.students.forEach((element, index) => {
        this.students[index]["isChecked"] = false;
      });

    }, (err) => console.log(err));
  }

  removeStudent(ay_student_id) {
    this.acadStudentService.removeStudent(ay_student_id).subscribe((responseData) => {
      this.getAcadStudents();

    }, (err) => console.log(err));
  }

  addStudents() {
    let addingStudents = [];
    this.students.forEach((element, index) => {
      if (element.isChecked) {
        addingStudents.push({ 'std_id': element.id, 'ay_id': Number(this.ay_id) });
      }
    });
    this.acadStudentService.addStudents(addingStudents).subscribe((responseData) => {
      console.log(responseData);
      this.getAcadStudents();

    }, (err) => console.log(err));
  }

}
