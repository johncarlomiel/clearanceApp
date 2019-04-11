import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  @ViewChild("sidebar") sidebarRef;
  pageActive = "dashboard";


  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkLogin();
  }

  changePage(page) {
    this.pageActive = page;
    this.sidebarRef.toggle();
  }

  checkLogin() {
    this.adminAuthService.getSession().subscribe((responseData) => {
      console.log(responseData);

    }, (err) => {
      console.log(err)
      alert("wala tanga")
      this.router.navigate(["/admin-login"]);
    });
  }

}
