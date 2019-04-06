import { Component, OnInit } from '@angular/core';
import * as date_fns from "date-fns";
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isAYModalOpen = false;
  isNotif = false;
  date_from = new Date();
  academicYears: Array<any>;
  isLoading = false;
  date_to = date_fns.addYears(this.date_from, 1);
  constructor(private adminService: AdminService) { }



  onDateChange() {
    this.date_to = date_fns.addYears(this.date_from, 1);
  }

  onSubmitNewAY() {
    let data = {
      date_from: date_fns.format(this.date_from, "YYYY"),
      date_to: date_fns.format(this.date_to, "YYYY")
    }
    this.isLoading = true;
    this.isAYModalOpen = false;
    this.adminService.createNewAY(data).subscribe((successData) => {
      this.getAcademicYears();
      this.isLoading = false;
      this.isNotif = true;
      setTimeout(() => {
        this.isNotif = false;
      }, 5000);
    }, (err) => console.log(err));
  }

  getAcademicYears() {
    this.adminService.getAY().subscribe((successData) => {
      this.academicYears = successData;
    }, (err) => console.log(err));
  }

  ngOnInit() {
    this.getAcademicYears();
  }

}
