import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  @ViewChild("sidebar") sidebarRef;
  pageActive = "dashboard";


  constructor() { }

  ngOnInit() {
  }

  changePage(page) {
    this.pageActive = page;
    this.sidebarRef.toggle();
  }

}
