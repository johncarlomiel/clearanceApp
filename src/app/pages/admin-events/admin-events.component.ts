import { Component, OnInit, Input } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {
  @Input() ay_id: number;
  events: Array<any>;
  selectedEvent: Object;
  isAddingEvent = false;
  message = {
    type: "positive",
    header: "default header",
    body: "",
    componentType: "notModal",
    isActive: false
  }
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  deleteEvent(id) {
    this.eventService.deleteEvent(id).subscribe((responseData) => {
      this.getEvents();

    }, (error) => console.log(error));
  }



  addEvent(f) {
    if (f.valid) {
      f.value["ay_id"] = Number(this.ay_id);
      this.eventService.addEvent(f.value).subscribe((responseData) => {
        this.getEvents();
        this.isAddingEvent = false;
        console.log(responseData);
      }, (err) => console.log(err));
    }
  }

  getEvents() {
    this.eventService.getEvents(Number(this.ay_id)).subscribe((responseData) => {
      this.events = responseData;
      console.log(this.events)
    }, (err) => console.log(err));
  }

  updateEvent() {
    this.eventService.updateEvent(this.selectedEvent).subscribe((responseData) => {
      console.log(responseData);
      this.getEvents();

    }, (err) => console.log(err));
  }

}
