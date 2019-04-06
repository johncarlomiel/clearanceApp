import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcadStudentsService } from 'src/app/services/acad-students.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentId = this.route.snapshot.paramMap.get("id");
  studentInfo: Object;
  studentEvents: Array<any>;
  p: number = 1;
  images = ["1.jpg", "2.png", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.png", "8.png", "9.png", "10.jpg"];
  luckyImage = this.randImages();
  constructor(
    private route: ActivatedRoute,
    private acadStudentService: AcadStudentsService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    localStorage.setItem("lastVisitedId", this.studentId);
    this.getStudentEvents();
    this.getStudentInfo();
  }
  getStudentInfo() {
    this.studentService.getSingleStudent(this.studentId).subscribe((responseData) => {
      console.log(responseData);
      this.studentInfo = responseData[0];

    }, (err) => console.log(err));
  }
  getStudentEvents() {
    this.acadStudentService.getStudent(this.studentId).subscribe((responseData) => {
      console.log(responseData);
      this.studentEvents = responseData;

    }, (err) => console.log(err));
  }

  randImages() {
    return "assets/chibis/" + this.images[Math.floor(Math.random() * (10 - 1 + 1) + 1)];
  }

}
