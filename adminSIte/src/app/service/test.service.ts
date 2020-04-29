import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {
  }

  newRecord(data) {
    return this.http.post<any>('https://covid19poojamaam.herokuapp.com/api/v1/fighters', data);
  }
}
