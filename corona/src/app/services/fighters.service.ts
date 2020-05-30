import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FightersService {

  api = environment.api;

  constructor(private http: HttpClient) {
  }

  getFighterList(countryName, pg, limit) {
    return this.http.get<any>(this.api + 'fighters/getfightergetByCountry?limit=' + limit + '&pg=' + pg + '&country=' + countryName);
  }

  getFighterById(id) {
    return this.http.get<any>(this.api + 'fighters/getbyid?id=' + id);
  }

  getTotal() {
    return this.http.get<any>(this.api + 'fighters/totalLikes');
  }

  addComment(data) {
    return this.http.post<any>(this.api + 'fighters/comment', data);
  }

  addLike(data) {
    return this.http.post<any>(this.api + 'fighters/postlike', data);
  }

  sendMail(data) {
    return this.http.post<any>(this.api + 'contact/', data);
  }

  searchByname(searchText, pg, limit) {
    return this.http.get<any>(this.api + 'fighters/getfightergetByName?searchText=' + searchText + '&pg=' + pg + '&limit=' + limit);
  }
}
