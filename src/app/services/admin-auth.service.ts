import { Injectable } from '@angular/core';
import { configs } from "../config/config";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private http: HttpClient) { }

  deleteUser(id): Observable<any> {
    return this.http.delete(configs.server_ip + "/account/" + id);
  }
  updateUser(data) :Observable<any>{
    return this.http.patch(configs.server_ip + "/account/" + data.user_id,data);
  }
  getUsers(): Observable<any> {
    return this.http.get<[]>(configs.server_ip + "/account");
  }
  addUser(data): Observable<any> {
    return this.http.post(configs.server_ip + "/account", data);
  }

  login(username, password): Observable<any> {
    let data = {
      username,
      pwd: password,
      type: "admin"
    }
    return this.http.post(configs.server_ip + "/auth", data);
  }

}