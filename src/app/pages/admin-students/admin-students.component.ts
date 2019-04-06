import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  students: Array<any>;
  isAddingModal = false;
  selectedStudent: Object;
  isUpdatingModal = false;
  message = {
    type: "positive",
    header: "default header",
    body: "",
    componentType: "notModal",
    isActive: false
  }
  p: number = 1;
  isLoading = false;
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }




  getStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
      console.log(this.students);
    }, (err) => console.log(err));
  }

  removeStudent(id) {
    this.isLoading = true;
    this.studentService.removeStudent(id).subscribe((responseData) => {
      this.getStudents();
      this.isLoading = false;
    }, err => console.log(err));
  }
  updateStudent(student) {
    this.isLoading = true;
    this.isUpdatingModal = false;
    console.log(student);
    this.studentService.updateStudent(student).subscribe((resData) => {
      this.getStudents();
      this.isLoading = false;
      this.message.header = "Student Info Updated";
      this.message.body = "";
      this.message.type = "positive";
      this.message.componentType = "notModal";
      this.message.isActive = true;

      setTimeout(() => {
        this.message.isActive = false;
      }, 7000);

    }, (err) => console.log(err));
  }

  addNewStudent(f) {
    if (f.valid) {
      this.message.header = "Student Added";
      this.message.body = `Student:${f.value.name} is now added`;
      this.message.type = "positive";
      this.isAddingModal = false;
      this.message.componentType = "notModal";
      this.studentService.addStudent(f.value).subscribe((responseData) => {
        this.message.isActive = true;
        this.getStudents();
        setTimeout(() => {
          this.message.isActive = false;
        }, 7000);
      }, (err) => {
        this.message.header = "Student adding failed";
        this.message.body = `There is already a student with this Student Id: ${f.value.id}`;
        this.message.type = "negative";
        this.message.componentType = "notModal";
        this.message.isActive = true;
        setTimeout(() => {
          this.message.isActive = false;
        }, 7000);
      });
    } else {
      this.message.header = "Warning";
      this.message.body = "Please fill all fields";
      this.message.type = "warning";
      this.message.isActive = true;
      this.message.componentType = "modal";
      setTimeout(() => {
        this.message.isActive = false;
      }, 7000);
    }
  }
}
