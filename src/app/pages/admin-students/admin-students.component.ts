import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import * as XLSX from 'xlsx';
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
  isBackroundLoading = false;
  @ViewChild('excelFile') excelFile: ElementRef;
  message = {
    type: "positive",
    header: "default header",
    body: "",
    componentType: "notModal",
    isActive: false
  }
  p: number = 1;
  isLoading = false;
  data: any;
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
    console.log(XLSX)
  }

  onFileChange(evt) {
    console.log(evt);
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 0 }));
      console.log(this.data);
      if (!!this.data) {
        //Check if the format is correct
        let headers = ["id", "name", "course", "year"];
        let header = Object.keys(this.data[0]);
        console.log(header);
        if (JSON.stringify(headers) === JSON.stringify(header)) {
          this.studentService.addStudents({ data: this.data }).subscribe((responseData) => {
            this.students = responseData;
            alert("Inserted students");

          }, (err) => {
            alert("This error might occur when there is a duplication of id between the database and the worksheet please delete the whole table and submit it again or check the id's of every student")
          });

        } else {
          alert("Incorrect headers of your worksheet file")
        }

      } else {
        alert("Submit a worksheet first");

      }

    };

    reader.readAsBinaryString(target.files[0]);

    // alert("Worksheet file parsed you can now use the button to check for errors and submit");
    this.excelFile.nativeElement.value = "";

  }

  submitWorksheet() {

  }




  getStudents() {
    this.isBackroundLoading = true;
    this.studentService.getStudents().subscribe((data) => {
      this.isBackroundLoading = false;
      this.students = data;
      console.log(this.students);
    }, (err) => console.log(err));
  }

  removeStudent(id) {
    this.isLoading = true;
    this.studentService.removeStudent(id).subscribe((responseData) => {
      this.students = responseData;
      this.isLoading = false;
    }, err => console.log(err));
  }
  deleteAllStudents() {
    this.studentService.deleteAllStudents().subscribe((responseData) => {
      alert("All Students are now deleted");
      this.students = responseData;

    }, (err) => console.log(err));
  }
  updateStudent(student) {
    this.isLoading = true;
    this.isUpdatingModal = false;
    console.log(student);
    this.studentService.updateStudent(student).subscribe((resData) => {
      this.students = resData;
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
      this.isLoading = true;
      this.message.header = "Student Added";
      this.message.body = `Student:${f.value.name} is now added`;
      this.message.type = "positive";
      this.isAddingModal = false;
      this.message.componentType = "notModal";
      this.studentService.addStudent(f.value).subscribe((responseData) => {
        this.isLoading = false;
        this.message.isActive = true;
        this.students = responseData;
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
