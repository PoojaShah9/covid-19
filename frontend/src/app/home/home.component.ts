import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FighterService} from "../services/fighter.service";
import {DomSanitizer} from '@angular/platform-browser';
import {Country} from '../country';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  display = 'none';
  selectedFighter: any = {};
  cntName = '';
  loading = false;
  searchText = '';
  fighterData: any = {};
  showDD = false;
  countrylist: any = [];
  background;

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer,
              private fighterService: FighterService) {
  }

  ngOnInit(): void {
    // magnificPopup();
    this.loading = true;
    this.http.get<any>('https://api.ipdata.co?api-key=test')
      .subscribe((res) => {
        console.log('location res', res);
        if (res) {
          this.loading = false;
          // this.cntName = 'India';
          this.cntName = res.country_name;
          this.getFighter(this.cntName);
        }
        // alert('location ' + res.country_name + ' ' + res.region +  ' ' + res.city);
      }, error => {
        this.loading= false;
        console.log('error', error);
      });
    this.countrylist = Country;

  }

  onTabClick(type) {
    console.log('type', type);
    if (type === 'country') {
      this.getFighter(this.cntName);
    } else {
      this.getFighter('');
    }
  }

  getFighter(country) {
    this.loading = true;
    this.fighterService.getFighterList(country)
      .subscribe((res) => {
        console.log('rees', res);
        if (res.data) {
          this.loading = false;
          this.fighterData = res.data;
          this.fighterData.filter((x) => {
            let image = this._arrayBufferToBase64(x.photo.data.data);
            // this.myFunction(image);
            x['photo'] = image;
            // this.mySrc = image;
          });
        }
      }, error => {
        this.loading = false;
        console.log('error', error);
      });

  }

  _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  }

  openModal(data) {
    this.selectedFighter = data;
    console.log('selected', this.selectedFighter);
    // let image = this._arrayBufferToBase64(this.selectedFighter.photo);
    // // this.myFunction(image);
    // this.selectedFighter['photo'] = image;
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
    (this.countrylist).forEach((x) => {
      if (x.name === this.searchText) {
        console.log('xxxxxxxxxxxx', this.searchText);
        this.getFighter(this.searchText);
      }
    });
    window.location.reload();
  }
}
