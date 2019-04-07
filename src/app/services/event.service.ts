import { Injectable } from '@angular/core';
import { configs } from "../config/config";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  deleteEvent(id, ay_id): Observable<any> {
    const params = new HttpParams().set('ay_id', ay_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      params
    };
    return this.http.delete(configs.server_ip + "/event/" + id, httpOptions);
  }

  updateEvent(data): Observable<any> {
    return this.http.patch(configs.server_ip + "/event/" + data.event_id, data);
  }
}
