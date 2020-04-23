import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FighterService} from "../services/fighter.service";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  display = 'none';
  imgName = '';
  cntName = '';
  mySrc = '';
  searchText = '';
  fighterData: any = {};
  showDD = false;
  countrylist: any = [];

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer,
              private fighterService: FighterService) { }

  ngOnInit(): void {
    // magnificPopup();
    this.http.get<any>('https://api.ipdata.co?api-key=test')
      .subscribe((res) => {
        console.log('location res', res);
        if(res) {
          this.cntName = res.country_name;
          this.getFighter(this.cntName);
        }
        // alert('location ' + res.country_name + ' ' + res.region +  ' ' + res.city);
      }, error => {
        console.log('error', error);
      });

  }

  onTabClick(type) {
    console.log('type', type);
    if(type === 'country') {
      this.getFighter(this.cntName);
    } else {
      this.getFighter('');
    }
  }

  getFighter(country) {
    this.fighterService.getFighterList(country)
      .subscribe((res) => {
        console.log('rees', res);
        if(res.data) {
          this.fighterData = res.data;
          this.fighterData.filter((x) => {
            let image = this._arrayBufferToBase64(x.photo.data.data);
            // this.myFunction(image);
            this.mySrc = image
          });
        }
      }, error => {
        console.log('error', error);
      });

  }

  myFunction(image) : void {
    let mySrc = this.sanitizer.bypassSecurityTrustUrl(image);
    console.log('imageeeee', mySrc);
  }

   _arrayBufferToBase64( buffer ) {
     var binary = '';
     var bytes = [].slice.call(new Uint8Array(buffer));
     bytes.forEach((b) => binary += String.fromCharCode(b));
     return window.btoa(binary);
  }

  openModal(img) {
    this.imgName = img;
    this.display = 'block';
  }

  closeModal() {
    this.display = 'none';
  }

  onChanges() {
    if (this.searchText === '' || this.searchText === undefined) {
      this.showDD = false;
    } else {
      this.showDD = true;
    }
  }

  onCountryChange() {
    console.log('searchText', this.searchText);
    localStorage.setItem('clusterName', this.searchText);
    (this.countrylist).forEach((x) => {
      if (x.cluster_name === this.searchText) {
        localStorage.setItem('monitor_url', x.monitor_url);
        localStorage.setItem('scanner_url', x.scanner_url);
      }
    });
    window.location.reload();
  }
}
