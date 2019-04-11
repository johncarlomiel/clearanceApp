import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { AcadService } from 'src/app/services/acad.service';

@Component({
  selector: 'app-acad-year',
  templateUrl: './acad-year.component.html',
  styleUrls: ['./acad-year.component.css']
})
export class AcadYearComponent implements OnInit {
  acadId = this.route.snapshot.paramMap.get("id");
  acadInfo: Object;
  isPrinting: boolean = false;
  stds_with_events: Array<any>;
  report_header: Object;
  selectedCourse: string;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private acadService: AcadService
  ) { }

  ngOnInit() {
    console.log(this.acadId);
    this.getAcadInfoById();
    console.log(this.acadInfo);
  }

  getAcadInfoById() {
    this.acadService.getAcadById(this.acadId).subscribe((responseData) => {
      this.acadInfo = responseData[0];
      console.log(this.acadInfo)
    }, (err) => console.log(err));
  }


  generateReport(course) {
    this.eventService.generateReport(this.acadId, course).subscribe((responseData) => {
      this.stds_with_events = responseData;
      this.report_header = this.stds_with_events[0].events;
      console.log(this.stds_with_events)
      this.isPrinting = true;
      setTimeout(() => {
        window.print();
      }, 1000);

      setTimeout(() => {
        this.isPrinting = false;
      }, 2000);

    }, (err) => console.log(err));
  }





}
