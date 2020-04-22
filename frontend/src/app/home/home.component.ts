import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  display = 'none';
  imgName = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // magnificPopup();
    this.http.get<any>('https://api.ipdata.co?api-key=test')
      .subscribe((res) => {
        console.log('location res', res);
        alert('location ' + res.country_name + ' ' + res.region +  ' ' + res.city);
      });
  }

  openModal(img) {
    this.imgName = img;
    this.display = 'block';
  }

  closeModal() {
    this.display = 'none';
  }

}
