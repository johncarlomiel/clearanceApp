import { Injectable } from '@angular/core';
import { configs } from "../config/config";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {

  }

  createNewAY(data: Object) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    console.log(data);
    return this.http.post(configs.server_ip + "/acad-year", data, httpOptions);
  }

  getAY() {
    return this.http.get<[]>(configs.server_ip + "/acad-year");
  }
}
