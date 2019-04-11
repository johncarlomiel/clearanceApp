import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { AcadStudentsService } from 'src/app/services/acad-students.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-acad-students',
  templateUrl: './acad-students.component.html',
  styleUrls: ['./acad-students.component.css']
})
export class AcadStudentsComponent implements OnInit {
  @Input('ay_id') ay_id: number;
  isLoading = false;
  addingStudentPaging: number = 1;
  studentPage: number = 1;
  isAddingStudent = false;
  isAddingLoading = false;
  students: Array<any>;
  acadStudents: Array<any>;
  addStudentSuccess = false;
  selectedStudentEvents: Object;
  isViewingStudentEvents = false;
  deletedStudentSuccess = false;
  isViewingLoading: boolean = false;
  paymentSuccessMsg = false;
  isAcadStudentsEmpty = true;

  emptyMessage: string;
  constructor(
    private studentService: StudentService,
    private acadStudentService: AcadStudentsService,
    private eventService: EventService

  ) { }

  ngOnInit() {
    this.getAcadStudents();

  }
  submitPayment(studentEventInfo, amount) {
    if (amount > studentEventInfo.balance) {
      alert("You exceeded the event full amount");
    } else {
      this.isViewingLoading = true;
      this.acadStudentService.updatePayment({ studentEventInfo, amount }).subscribe((responseData) => {
        this.isViewingLoading = false;
        this.selectedStudentEvents = {
          std_id: responseData[0].std_id,
          events: responseData
        };
        this.paymentSuccessMsg = true;
        setTimeout(() => {
          this.paymentSuccessMsg = false;
        }, 7000);

      }, (err) => console.log(err));
    }
  }

  viewPayment(std_id) {
    this.isLoading = true;
    this.acadStudentService.getStudent(std_id).subscribe((responseData) => {
      this.isLoading = false;
      this.selectedStudentEvents = {

        std_id: std_id,
        events: responseData
      };
      this.isViewingStudentEvents = true;

    }, (err) => console.log(err));
  }

  checkAcadStudentsStatus() {
    if (this.acadStudents.length == 0) {
      this.isAcadStudentsEmpty = true;
      this.emptyMessage = "You may now add student to the academic year";

    } else {
      this.isAcadStudentsEmpty = false;

    }
  }

  getAcadStudents() {
    this.isLoading = true;
    this.acadStudentService.getStudents(this.ay_id).subscribe((responseData) => {
      this.acadStudents = responseData;

      console.log(this.acadStudents)
      this.isLoading = false;
      this.getStudents();
      this.checkAcadStudentsStatus();
    }, (err) => console.log(err));
  }

  getStudents() {
    this.isAddingLoading = true;
    let excludedStudents = [];
    this.acadStudents.forEach((element) => {
      excludedStudents.push(element.id);
    });
    this.studentService.getStudentsNotInAY(excludedStudents).subscribe((responseData) => {
      this.isAddingLoading = false;
      this.students = responseData;
      console.log(this.students);
      this.students.forEach((element, index) => {
        this.students[index]["isChecked"] = false;
      });

    }, (err) => {
      this.isAddingLoading = false;
    });
  }

  removeStudent(ay_student_id) {
    this.isLoading = true;
    this.acadStudentService.removeStudent(ay_student_id, this.ay_id).subscribe((responseData) => {
      this.acadStudents = responseData;
      this.isLoading = false;
      this.deletedStudentSuccess = true;
      this.getStudents();

      this.checkAcadStudentsStatus();
      setTimeout(() => {
        this.deletedStudentSuccess = false;
      }, 7000);

    }, (err) => console.log(err));
  }

  search(keyword) {
    this.isLoading = true;
    this.acadStudentService.search(keyword, this.ay_id).subscribe((responseData) => {
      this.acadStudents = responseData;
      this.isLoading = false;
    }, (err) => console.log(err));
  }

  toggleAll() {
    this.students.forEach((element, index) => {
      this.students[index].isChecked = !element.isChecked;
    });
  }


  addStudents() {
    this.isAddingLoading = true;
    let addingStudents = [];
    this.students.forEach((element, index) => {
      if (element.isChecked) {
        addingStudents.push({ 'std_id': element.id, 'ay_id': Number(this.ay_id) });
      }
    });
    this.acadStudentService.addStudents(addingStudents).subscribe((responseData) => {
      this.isAddingLoading = false;
      console.log(responseData);
      this.acadStudents = responseData.acad_students;
      this.addEvents(responseData.noEntryOnEventStds);
      this.isAddingStudent = false;
      this.getStudents();
      this.addStudentSuccess = true;

      this.checkAcadStudentsStatus();
      setTimeout(() => {
        this.addStudentSuccess = false;
      }, 7000);

    }, (err) => console.log(err));
  }

  addEvents(students) {
    this.eventService.getEvents(this.ay_id).subscribe((responseData) => {
      this.acadStudentService.addStudentsEvents(students, responseData).subscribe((responseData) => {
        console.log(responseData);

      }, (err) => console.log(err));
    }, (err) => console.log(err));
  }

}
