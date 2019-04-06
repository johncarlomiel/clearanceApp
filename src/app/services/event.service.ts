import { Injectable } from '@angular/core';
import { configs } from "../config/config";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  addEvent(data): Observable<any> {
    return this.http.post(configs.server_ip + "/event", data);
  }

  getEvents(id): Observable<any> {
    return this.http.get(configs.server_ip + "/event/" + id);
  }

  deleteEvent(id): Observable<any> {
    return this.http.delete(configs.server_ip + "/event/" + id);
  }

  updateEvent(data): Observable<any> {
    return this.http.patch(configs.server_ip + "/event/" + data.event_id, data);
  }
}
