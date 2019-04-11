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

  addStudents(students): Observable<any> {
    return this.http.post(configs.server_ip + "/student/cluster", students);
  }

  getStudentsNotInAY(excludedStudents): Observable<any> {
    let data = {
      excludedStudents
    }
    return this.http.post<[]>(configs.server_ip + "/student/excluded", data);
  }

  removeStudent(id): Observable<any> {
    return this.http.delete(configs.server_ip + "/student/" + id);
  }

  addStudent(data): Observable<any> {
    return this.http.post(configs.server_ip + "/student", data);
  }


  deleteAllStudents(): Observable<any> {
    return this.http.delete(configs.server_ip + "/student/truncate/0");
  }

  getSingleStudent(id): Observable<any> {
    return this.http.get(configs.server_ip + "/student/" + id);

  }

  updateStudent(data): Observable<any> {
    return this.http.patch(configs.server_ip + "/student/" + data.id, data);
  }
}
