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
  isAddingEvent: boolean = false;
  isLoading: boolean = false;
  eventPage: number = 1;
  isUpdatingLoading: boolean = false;
  isAddingLoading: boolean = false;
  isUpdatingEvent: boolean = false;
  addingEventMessage: boolean = false;
  updateMessageSuccess: boolean = false;

  message = {
    isShow: false,
    message: ""

  }
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  deleteEvent(id) {
    this.isLoading = true;

    this.eventService.deleteEvent(id, this.ay_id).subscribe((responseData) => {
      this.events = responseData;
      this.isLoading = false;
      this.message.message = "Event Deleted"
      this.message.isShow = true;
      setTimeout(() => {
        this.message.isShow = false;
      }, 7000);

    }, (error) => console.log(error));
  }



  addEvent(f) {
    this.isAddingLoading = true;
    if (f.valid) {
      f.value["ay_id"] = Number(this.ay_id);
      this.eventService.addEvent(f.value).subscribe((responseData) => {
        this.isAddingLoading = false;
        this.events = responseData;
        this.isAddingEvent = false;
        this.message.message = "Event Added"
        this.message.isShow = true;
        setTimeout(() => {
          this.message.isShow = false;
        }, 7000);
        console.log(responseData);
      }, (err) => console.log(err));
    }
  }

  getEvents() {
    this.isLoading = true;
    this.eventService.getEvents(Number(this.ay_id)).subscribe((responseData) => {
      this.events = responseData;
      this.isLoading = false;
      console.log(this.events)
    }, (err) => console.log(err));
  }

  updateEvent() {
    this.isUpdatingLoading = true;
    this.eventService.updateEvent(this.selectedEvent).subscribe((responseData) => {
      console.log(responseData);
      this.events = responseData;
      this.isUpdatingLoading = false;
      this.isUpdatingEvent = false;
      this.message.message = "Event Updated"
      this.message.isShow = true;
      setTimeout(() => {
        this.message.isShow = false;
      }, 7000);

    }, (err) => console.log(err));
  }

}
