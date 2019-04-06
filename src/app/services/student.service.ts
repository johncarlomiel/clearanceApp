import { Injectable } from '@angular/core';
import { configs } from "../config/config";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }


  getStudents(): Observable<any> {
    return this.http.get<[]>(configs.server_ip + "/student");
  }

  getStudentsNotInAY(excludedStudents): Observable<any> {
    const params = new HttpParams().set('excludedStudents', JSON.stringify(excludedStudents));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
      params
    };
    return this.http.get<[]>(configs.server_ip + "/student", httpOptions);
  }

  removeStudent(id): Observable<any> {
    return this.http.delete(configs.server_ip + "/student/" + id);
  }

  addStudent(data): Observable<any> {
    return this.http.post(configs.server_ip + "/student", data);
  }

  getSingleStudent(id): Observable<any> {
    return this.http.get(configs.server_ip + "/student/" + id);

  }

  updateStudent(data): Observable<any> {
    return this.http.patch(configs.server_ip + "/student/" + data.id, data);
  }
}
