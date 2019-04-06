import { Injectable } from '@angular/core';
import { configs } from "../config/config";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AcadService {

  constructor(private http: HttpClient) { }


  getAcadById(id): Observable<any> {
    return this.http.get(configs.server_ip + "/acad-year/" + id);
  }

}
