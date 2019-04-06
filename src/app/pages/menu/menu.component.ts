import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input('page') page: string;

  pages = [
    { name: "Home", linkTo: "/home", isActive: false },
    { name: "Student", linkTo: "/student/" + localStorage.getItem("lastVisitedId"), isActive: false }
  ]
  constructor() { }

  ngOnInit() {
    this.pages.forEach((element, index) => {
      if (element.name == this.page) {
        this.pages[index].isActive = true;
      } else {
        this.pages[index].isActive = false;
      }
    });
  }



}
