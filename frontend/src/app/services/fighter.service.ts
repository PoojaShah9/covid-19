import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FighterService {

  api = environment.api;
  constructor(private http: HttpClient) { }

  getFighterList(countryName) {
    return this.http.get<any>(this.api + 'fighters/getfightergetByCountry?country=' + countryName);
  }
}
