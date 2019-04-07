import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AcadStudentsService } from 'src/app/services/acad-students.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  acad_years: Array<any>;
  keyword: string;
  selectVal: string;
  isLoading = false;
  isAYLoading = false;
  p: number = 1;
  selectedAY: { id: number, date_from: string, date_to: string };
  students: Array<any>;
  constructor(
    private adminService: AdminService,
    private acadStudents: AcadStudentsService
  ) { }

  ngOnInit() {
    this.getAY();
  }
  search(keyword) {
    this.isLoading = true;
    console.log(this.selectedAY)
    this.acadStudents.search(keyword, this.selectedAY.id).subscribe((responseData) => {
      this.isLoading = false;
      this.students = responseData;
      console.log(this.students);

    }, (err) => console.log(err));
  }


  getAY() {
    this.isAYLoading = true;
    this.adminService.getAY().subscribe((responseData) => {
      this.acad_years = responseData;
      this.isAYLoading = false;
      // this.selectedAY = this.acad_years[0];

      console.log(this.acad_years);
    }, (err) => console.log(err));
  }

  ayChange(e) {
    this.isAYLoading = true;
    this.isLoading = true;
    console.log(this.selectedAY)
    this.acadStudents.getStudents(this.selectedAY.id).subscribe((responseData) => {
      this.isLoading = false;
      this.students = responseData;
      this.isAYLoading = false;
      console.log(this.students)

    }, (err) => console.log(err));

  }





}
