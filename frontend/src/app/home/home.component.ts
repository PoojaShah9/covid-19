import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FighterService} from "../services/fighter.service";
import {DomSanitizer} from '@angular/platform-browser';
import {Country} from '../country';
import {ShareService} from '@ngx-share/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  display = 'none';
  displayReturnModal = 'none';
  selectedFighter: any = {};
  cntName = '';
  loading = false;
  searchText = '';
  fighterData: any = {};
  showDD = false;
  countrylist: any = [];
  background;
  photoArray: any = ['https://wallpapercave.com/wp/wp2622932.jpg',
    'https://lu2cspjiis-flywheel.netdna-ssl.com/wp-content/uploads/2017/03/pexels-photo-105254.jpeg',
    'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/04/bd7ef9c6cfca327dc3fa4cee512a68be.jpg',
    'https://blog.shawacademy.com/wp-content/uploads/2015/09/Photography-is.jpg',
    'https://blog.shawacademy.com/wp-content/uploads/2015/09/photographer-1000x605.jpg',
    'https://blog.shawacademy.com/wp-content/uploads/2015/09/photography-tutor-1000x605.jpg'];
  param1;
  param2;

  constructor(private http: HttpClient,
              public share: ShareService,
              private sanitizer: DomSanitizer,
              private fighterService: FighterService,
              private route: ActivatedRoute) {
  }

  onShareClick(e) {
    console.log('eeeeee', e);
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
        this.loading = false;
        this.cntName = 'India';
        this.getFighter(this.cntName);
        console.log('error', error);
      });
    this.countrylist = Country;
    this.route.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        console.log('in if');
        this.getFighter(this.cntName);
        this.openReturnModal()
      } else {
        console.log('in else');
      }
    });

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
          this.fighterData.filter((x, i) => {
            // this.photoArray.filter((y) => {
            x['link'] = this.photoArray[i];
            // });
            // let image = this._arrayBufferToBase64(x.photo.data.data);
            // // this.myFunction(image);
            // x['photo'] = image;
            // // this.mySrc = image;
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
    this.display = 'block';
  }

  openReturnModal() {
    this.displayReturnModal = 'block';
  }

  closeModal() {
    this.display = 'none';
    this.displayReturnModal = 'none';
  }

  onChanges(e) {
    // let abc = e.target.value.toUpperCase();
    // console.log('abcccc', e.target.value, abc);
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
