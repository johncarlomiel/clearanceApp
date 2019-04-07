import { Injectable } from '@angular/core';
import { configs } from "../config/config";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AcadStudentsService {

  constructor(private http: HttpClient) { }
  search(keyword, ay_id): Observable<any> {
    const params = new HttpParams().set('keyword', keyword).set('ay_id', ay_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      params
    };
    return this.http.get(configs.server_ip + "/acad-students", httpOptions);

  }

  addStudents(data): Observable<any> {
    let rqstData = {
      data
    }
    return this.http.post(configs.server_ip + "/acad-students", rqstData);
  }
  updatePayment(data): Observable<any> {
    return this.http.patch(configs.server_ip + "/acad-students/" + data.studentEventInfo.student_events_id, data);
  }

  //All Acad Students
  getStudents(id): Observable<any> {
    const params = new HttpParams().set('ay_id', id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      params
    };
    return this.http.get(configs.server_ip + "/acad-students", httpOptions);
  }
  //Single Acad student using Student Id
  getStudent(id): Observable<any> {
    return this.http.get(configs.server_ip + "/acad-students/" + id);
  }

  removeStudent(id, ay_id): Observable<any> {
    const params = new HttpParams().set('ay_id', ay_id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      params
    };
    return this.http.delete(configs.server_ip + "/acad-students/" + id, httpOptions);
  }
}
