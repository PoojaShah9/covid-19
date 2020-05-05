import {Component, OnInit} from '@angular/core';
import {FightersService} from '../services/fighters.service';
import {Country} from '../../country';
import {ActivatedRoute, Router} from "@angular/router";
import {PlatformLocation} from "@angular/common";

interface IServerResponse {
  items: string[];
  total: number;
}

declare var magnificPopup: Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fighterData: any = [];
  cntName: string = null;
  loading = false;
  currentFighter: any = {};
  user: any = {};
  popupVisible = false;
  display = 'none';
  displayDemo = 'none';
  showDD = false;
  countrylist: any = [];
  searchText = '';
  photoArray: any = ['https://ak.picdn.net/offset/photos/5e9f12f3d164c0404ea4d716/medium/offset_930275.jpg',
    'https://www.themachinemaker.com/upload/innovation/Dr-Pravina-Gondalia.jpg',
    'https://media.istockphoto.com/photos/young-asian-female-doctor-with-mask-show-ok-with-both-picture-id631181544?' +
    'k=6&m=631181544&s=170667a&w=0&h=NY0meO9RIdUprv3VGpXcuBgbJKF6IPDDKnsUeaRuoAc=',
    'https://c8.alamy.com/comp/ABJ1WE/traffic-policeman-with-face-mask-bangkok-thailand-ABJ1WE.jpg',
    'https://thenypost.files.wordpress.com/2020/03/200321-coronavirus-masks.jpg',
    'https://i.pinimg.com/originals/2c/a8/69/2ca869fa7b11fae2a0b15e83c318a164.jpg'];
  href;
  // @Input('data') meals: string[] = [];
  // asyncMeals: Observable<string[]>;
  // p: number = 1;
  // total: number;

  constructor(private fighterService: FightersService,
              private route: ActivatedRoute,
              private router: Router,
              private platformLocation: PlatformLocation) {
  }

  ngOnInit(): void {
    // this.cntName = 'India';
    this.countrylist = Country;
    this.getFighter('');
    this.route.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        // this.href = 'https://www.cnox.io';
        this.href = (this.platformLocation as any).href + '/?id=' + params.id;
        // console.log('in if');
        // this.getFighter(this.cntName);
        this.fighterService.getFighterById(params.id)
          .subscribe((res) => {
            console.log('getbyid', res);
            this.currentFighter = res.data;
            this.currentFighter.link = this.photoArray[0];
          });
        this.showFighter(this.currentFighter);
      } else {
        console.log('in else');
      }
    });
  }

  onSubmitmsg(e) {
    // alert('hello');
    console.log('user', e);
    this.user.name = localStorage.getItem('username');
  }

  getFighter(country) {
    this.loading = true;
    this.fighterService.getFighterList(country)
      .subscribe((res) => {
        if (res.data) {
          this.loading = false;
          this.fighterData = res.data;
          console.log('Herer', this.fighterData);
          magnificPopup();
          this.fighterData.filter((x, i) => {
            x.link = this.photoArray[Math.floor(Math.random() * Math.floor(this.photoArray.length))];
          });
          this.currentFighter = this.fighterData[1];
        }
      }, error => {
        this.loading = false;
        console.log('error', error);
      });

  }

  changeFavoriteState(e) {
    console.log('event', e);
  }

  showFighter(data) {
    this.currentFighter = data;
    // this.href = "https://www.cnox.io?id=123";
    this.href = (this.platformLocation as any).href + '?id=' + this.currentFighter.fighter_id;
    this.popupVisible = true;
  }

  onTabClick(type) {
    console.log('type', type);
    if (type === 'country') {
      this.getFighter(this.cntName);
    } else {
      this.getFighter('');
    }
  }

  onKeyUp(e) {
    console.log('event', e);
  }

  openModal(data) {
    this.display = 'block';
    this.currentFighter = data;
    console.log('data', this.currentFighter);
  }

  open() {
    this.displayDemo = 'block';
  }

  closeModal() {
    this.display = 'none';
    this.displayDemo = 'none';
  }

  onChanges(e) {
    // let abc = e.target.value.toUpperCase();
    console.log('abcccc', e.target.value);
    if (this.searchText === '' || this.searchText === undefined) {
      this.showDD = false;
    } else {
      this.showDD = true;
    }
  }

  onCountryChange() {
    console.log('searchText', this.searchText);
    (this.countrylist).filter((x) => {
      if (x.name === this.searchText) {
        console.log('xxxxxxxxxxxx', this.searchText);
        this.getFighter(this.searchText);
      }
    });
    window.location.reload();
  }

  /*getPage(page: number) {
    this.loading = true;
    this.asyncMeals = serverCall(this.meals, page).pipe(
      tap(res => {
        this.total = res.total;
        this.p = page;
        this.loading = false;
      }),
      map(res => res.items)
    );
  }*/
}

/**
 * Simulate an async HTTP call with a delayed observable.
 */


/*function serverCall(meals: string[], page: number): Observable<IServerResponse> {
  const perPage = 10;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return of({
    items: meals.slice(start, end),
    total: 100
  }).pipe(delay(1000));
}*/
