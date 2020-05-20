import {Component, OnInit} from '@angular/core';
import {FightersService} from '../services/fighters.service';
// import {Country} from '../../country';
import {ActivatedRoute, Router} from "@angular/router";
import {PlatformLocation} from "@angular/common";
import {HttpClient} from "@angular/common/http";

declare var tab: Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fighterData: any = [];
  comments: any = [];
  cntName: string = '';
  loading = false;
  currentFighter: any = {};
  user: any = {};
  popupVisible = false;
  dataShow = false;
  display = 'none';
  displayName = 'none';
  showDD = false;
  showComment = false;
  countrylist: any = [
    {name: 'Afghanistan', code: 'AF'},
    {name: 'Åland Islands', code: 'AX'},
    {name: 'Albania', code: 'AL'},
    {name: 'Algeria', code: 'DZ'},
    {name: 'American Samoa', code: 'AS'},
    {name: 'AndorrA', code: 'AD'},
    {name: 'Angola', code: 'AO'},
    {name: 'Anguilla', code: 'AI'},
    {name: 'Antarctica', code: 'AQ'},
    {name: 'Antigua and Barbuda', code: 'AG'},
    {name: 'Argentina', code: 'AR'},
    {name: 'Armenia', code: 'AM'},
    {name: 'Aruba', code: 'AW'},
    {name: 'Australia', code: 'AU'},
    {name: 'Austria', code: 'AT'},
    {name: 'Azerbaijan', code: 'AZ'},
    {name: 'Bahamas', code: 'BS'},
    {name: 'Bahrain', code: 'BH'},
    {name: 'Bangladesh', code: 'BD'},
    {name: 'Barbados', code: 'BB'},
    {name: 'Belarus', code: 'BY'},
    {name: 'Belgium', code: 'BE'},
    {name: 'Belize', code: 'BZ'},
    {name: 'Benin', code: 'BJ'},
    {name: 'Bermuda', code: 'BM'},
    {name: 'Bhutan', code: 'BT'},
    {name: 'Bolivia', code: 'BO'},
    {name: 'Bosnia and Herzegovina', code: 'BA'},
    {name: 'Botswana', code: 'BW'},
    {name: 'Bouvet Island', code: 'BV'},
    {name: 'Brazil', code: 'BR'},
    {name: 'British Indian Ocean Territory', code: 'IO'},
    {name: 'Brunei Darussalam', code: 'BN'},
    {name: 'Bulgaria', code: 'BG'},
    {name: 'Burkina Faso', code: 'BF'},
    {name: 'Burundi', code: 'BI'},
    {name: 'Cambodia', code: 'KH'},
    {name: 'Cameroon', code: 'CM'},
    {name: 'Canada', code: 'CA'},
    {name: 'Cape Verde', code: 'CV'},
    {name: 'Cayman Islands', code: 'KY'},
    {name: 'Central African Republic', code: 'CF'},
    {name: 'Chad', code: 'TD'},
    {name: 'Chile', code: 'CL'},
    {name: 'China', code: 'CN'},
    {name: 'Christmas Island', code: 'CX'},
    {name: 'Cocos (Keeling) Islands', code: 'CC'},
    {name: 'Colombia', code: 'CO'},
    {name: 'Comoros', code: 'KM'},
    {name: 'Congo', code: 'CG'},
    {name: 'Congo, The Democratic Republic of the', code: 'CD'},
    {name: 'Cook Islands', code: 'CK'},
    {name: 'Costa Rica', code: 'CR'},
    {name: 'Cote D\'Ivoire', code: 'CI'},
    {name: 'Croatia', code: 'HR'},
    {name: 'Cuba', code: 'CU'},
    {name: 'Cyprus', code: 'CY'},
    {name: 'Czech Republic', code: 'CZ'},
    {name: 'Denmark', code: 'DK'},
    {name: 'Djibouti', code: 'DJ'},
    {name: 'Dominica', code: 'DM'},
    {name: 'Dominican Republic', code: 'DO'},
    {name: 'Ecuador', code: 'EC'},
    {name: 'Egypt', code: 'EG'},
    {name: 'El Salvador', code: 'SV'},
    {name: 'Equatorial Guinea', code: 'GQ'},
    {name: 'Eritrea', code: 'ER'},
    {name: 'Estonia', code: 'EE'},
    {name: 'Ethiopia', code: 'ET'},
    {name: 'Falkland Islands (Malvinas)', code: 'FK'},
    {name: 'Faroe Islands', code: 'FO'},
    {name: 'Fiji', code: 'FJ'},
    {name: 'Finland', code: 'FI'},
    {name: 'France', code: 'FR'},
    {name: 'French Guiana', code: 'GF'},
    {name: 'French Polynesia', code: 'PF'},
    {name: 'French Southern Territories', code: 'TF'},
    {name: 'Gabon', code: 'GA'},
    {name: 'Gambia', code: 'GM'},
    {name: 'Georgia', code: 'GE'},
    {name: 'Germany', code: 'DE'},
    {name: 'Ghana', code: 'GH'},
    {name: 'Gibraltar', code: 'GI'},
    {name: 'Greece', code: 'GR'},
    {name: 'Greenland', code: 'GL'},
    {name: 'Grenada', code: 'GD'},
    {name: 'Guadeloupe', code: 'GP'},
    {name: 'Guam', code: 'GU'},
    {name: 'Guatemala', code: 'GT'},
    {name: 'Guernsey', code: 'GG'},
    {name: 'Guinea', code: 'GN'},
    {name: 'Guinea-Bissau', code: 'GW'},
    {name: 'Guyana', code: 'GY'},
    {name: 'Haiti', code: 'HT'},
    {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
    {name: 'Holy See (Vatican City State)', code: 'VA'},
    {name: 'Honduras', code: 'HN'},
    {name: 'Hong Kong', code: 'HK'},
    {name: 'Hungary', code: 'HU'},
    {name: 'Iceland', code: 'IS'},
    {name: 'India', code: 'IN'},
    {name: 'Indonesia', code: 'ID'},
    {name: 'Iran, Islamic Republic Of', code: 'IR'},
    {name: 'Iraq', code: 'IQ'},
    {name: 'Ireland', code: 'IE'},
    {name: 'Isle of Man', code: 'IM'},
    {name: 'Israel', code: 'IL'},
    {name: 'Italy', code: 'IT'},
    {name: 'Jamaica', code: 'JM'},
    {name: 'Japan', code: 'JP'},
    {name: 'Jersey', code: 'JE'},
    {name: 'Jordan', code: 'JO'},
    {name: 'Kazakhstan', code: 'KZ'},
    {name: 'Kenya', code: 'KE'},
    {name: 'Kiribati', code: 'KI'},
    {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
    {name: 'Korea, Republic of', code: 'KR'},
    {name: 'Kuwait', code: 'KW'},
    {name: 'Kyrgyzstan', code: 'KG'},
    {name: 'Lao People\'S Democratic Republic', code: 'LA'},
    {name: 'Latvia', code: 'LV'},
    {name: 'Lebanon', code: 'LB'},
    {name: 'Lesotho', code: 'LS'},
    {name: 'Liberia', code: 'LR'},
    {name: 'Libyan Arab Jamahiriya', code: 'LY'},
    {name: 'Liechtenstein', code: 'LI'},
    {name: 'Lithuania', code: 'LT'},
    {name: 'Luxembourg', code: 'LU'},
    {name: 'Macao', code: 'MO'},
    {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
    {name: 'Madagascar', code: 'MG'},
    {name: 'Malawi', code: 'MW'},
    {name: 'Malaysia', code: 'MY'},
    {name: 'Maldives', code: 'MV'},
    {name: 'Mali', code: 'ML'},
    {name: 'Malta', code: 'MT'},
    {name: 'Marshall Islands', code: 'MH'},
    {name: 'Martinique', code: 'MQ'},
    {name: 'Mauritania', code: 'MR'},
    {name: 'Mauritius', code: 'MU'},
    {name: 'Mayotte', code: 'YT'},
    {name: 'Mexico', code: 'MX'},
    {name: 'Micronesia, Federated States of', code: 'FM'},
    {name: 'Moldova, Republic of', code: 'MD'},
    {name: 'Monaco', code: 'MC'},
    {name: 'Mongolia', code: 'MN'},
    {name: 'Montserrat', code: 'MS'},
    {name: 'Morocco', code: 'MA'},
    {name: 'Mozambique', code: 'MZ'},
    {name: 'Myanmar', code: 'MM'},
    {name: 'Namibia', code: 'NA'},
    {name: 'Nauru', code: 'NR'},
    {name: 'Nepal', code: 'NP'},
    {name: 'Netherlands', code: 'NL'},
    {name: 'Netherlands Antilles', code: 'AN'},
    {name: 'New Caledonia', code: 'NC'},
    {name: 'New Zealand', code: 'NZ'},
    {name: 'Nicaragua', code: 'NI'},
    {name: 'Niger', code: 'NE'},
    {name: 'Nigeria', code: 'NG'},
    {name: 'Niue', code: 'NU'},
    {name: 'Norfolk Island', code: 'NF'},
    {name: 'Northern Mariana Islands', code: 'MP'},
    {name: 'Norway', code: 'NO'},
    {name: 'Oman', code: 'OM'},
    {name: 'Pakistan', code: 'PK'},
    {name: 'Palau', code: 'PW'},
    {name: 'Palestinian Territory, Occupied', code: 'PS'},
    {name: 'Panama', code: 'PA'},
    {name: 'Papua New Guinea', code: 'PG'},
    {name: 'Paraguay', code: 'PY'},
    {name: 'Peru', code: 'PE'},
    {name: 'Philippines', code: 'PH'},
    {name: 'Pitcairn', code: 'PN'},
    {name: 'Poland', code: 'PL'},
    {name: 'Portugal', code: 'PT'},
    {name: 'Puerto Rico', code: 'PR'},
    {name: 'Qatar', code: 'QA'},
    {name: 'Reunion', code: 'RE'},
    {name: 'Romania', code: 'RO'},
    {name: 'Russian Federation', code: 'RU'},
    {name: 'RWANDA', code: 'RW'},
    {name: 'Saint Helena', code: 'SH'},
    {name: 'Saint Kitts and Nevis', code: 'KN'},
    {name: 'Saint Lucia', code: 'LC'},
    {name: 'Saint Pierre and Miquelon', code: 'PM'},
    {name: 'Saint Vincent and the Grenadines', code: 'VC'},
    {name: 'Samoa', code: 'WS'},
    {name: 'San Marino', code: 'SM'},
    {name: 'Sao Tome and Principe', code: 'ST'},
    {name: 'Saudi Arabia', code: 'SA'},
    {name: 'Senegal', code: 'SN'},
    {name: 'Serbia and Montenegro', code: 'CS'},
    {name: 'Seychelles', code: 'SC'},
    {name: 'Sierra Leone', code: 'SL'},
    {name: 'Singapore', code: 'SG'},
    {name: 'Slovakia', code: 'SK'},
    {name: 'Slovenia', code: 'SI'},
    {name: 'Solomon Islands', code: 'SB'},
    {name: 'Somalia', code: 'SO'},
    {name: 'South Africa', code: 'ZA'},
    {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
    {name: 'Spain', code: 'ES'},
    {name: 'Sri Lanka', code: 'LK'},
    {name: 'Sudan', code: 'SD'},
    {name: 'Suriname', code: 'SR'},
    {name: 'Svalbard and Jan Mayen', code: 'SJ'},
    {name: 'Swaziland', code: 'SZ'},
    {name: 'Sweden', code: 'SE'},
    {name: 'Switzerland', code: 'CH'},
    {name: 'Syrian Arab Republic', code: 'SY'},
    {name: 'Taiwan, Province of China', code: 'TW'},
    {name: 'Tajikistan', code: 'TJ'},
    {name: 'Tanzania, United Republic of', code: 'TZ'},
    {name: 'Thailand', code: 'TH'},
    {name: 'Timor-Leste', code: 'TL'},
    {name: 'Togo', code: 'TG'},
    {name: 'Tokelau', code: 'TK'},
    {name: 'Tonga', code: 'TO'},
    {name: 'Trinidad and Tobago', code: 'TT'},
    {name: 'Tunisia', code: 'TN'},
    {name: 'Turkey', code: 'TR'},
    {name: 'Turkmenistan', code: 'TM'},
    {name: 'Turks and Caicos Islands', code: 'TC'},
    {name: 'Tuvalu', code: 'TV'},
    {name: 'Uganda', code: 'UG'},
    {name: 'Ukraine', code: 'UA'},
    {name: 'United Arab Emirates', code: 'AE'},
    {name: 'United Kingdom', code: 'GB'},
    {name: 'United States', code: 'US'},
    {name: 'United States Minor Outlying Islands', code: 'UM'},
    {name: 'Uruguay', code: 'UY'},
    {name: 'Uzbekistan', code: 'UZ'},
    {name: 'Vanuatu', code: 'VU'},
    {name: 'Venezuela', code: 'VE'},
    {name: 'Viet Nam', code: 'VN'},
    {name: 'Virgin Islands, British', code: 'VG'},
    {name: 'Virgin Islands, U.S.', code: 'VI'},
    {name: 'Wallis and Futuna', code: 'WF'},
    {name: 'Western Sahara', code: 'EH'},
    {name: 'Yemen', code: 'YE'},
    {name: 'Zambia', code: 'ZM'},
    {name: 'Zimbabwe', code: 'ZW'}
  ];
  searchText = '';
  currentPage;
  href;
  p: number = 0;
  limit: number = 20;
  total: number;
  btnColor = false;
  likecount;
  throttle = 10;
  scrollDistance = 1;
  scrollUpDistance = 2;
  changeClass = true;
  tabName = '#tab01';

  constructor(private fighterService: FightersService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private platformLocation: PlatformLocation) {
  }


  ngOnInit(): void {
    tab();
    this.getFighter('', this.p, this.limit);
    // this.getCurrentLocation();
    // this.cntName = 'India';
    // this.countrylist = Country;
    this.route.queryParams.subscribe(params => {
      console.log('params', params);
      if (params.id) {
        this.href = (this.platformLocation as any).href + '/?id=' + params.id;
        this.getFighterById(params.id);
        this.showFighter(this.currentFighter);
      }
    });
  }

  getCurrentLocation() {
    this.http.get<any>('http://ip-api.com/json')
      .subscribe((res) => {
        console.log('resssss', res);
        this.cntName = res.country;
        if (this.cntName !== undefined) {
          this.changeClass = false;
          this.getFighter(this.cntName, this.p, this.limit);
        } else {
          this.changeClass = true;
          this.getFighter('', this.p, this.limit);
        }
      });
  }

  onLikeClick() {
    if (this.btnColor) {
      this.btnColor = false;
      this.currentFighter.totalLikes = this.currentFighter.totalLikes - 1;
    } else {
      console.log('in like');
      this.btnColor = true;
      this.currentFighter.totalLikes = this.currentFighter.totalLikes + 1;
    }
    let data = {
      fighter_id: this.currentFighter.fighter_id,
      likes: this.currentFighter.totalLikes
    };
    this.loading = true;
    this.fighterService.addLike(data)
      .subscribe((res) => {
        console.log('res', res);
        this.currentFighter.totalLikes = res.data.totalLikes;
        this.loading = false;
      });
  }

  getFighterById(id) {
    this.loading = true;
    this.fighterService.getFighterById(id)
      .subscribe((res) => {
        console.log('getbyid', res);
        this.loading = false;
        this.likecount = this.currentFighter.totalLikes;
        this.currentFighter = res.data.result;
        console.log('currentFighter', this.currentFighter);
        this.comments = res.data.comments;
        if (this.comments.length === 0) {
          this.showComment = true;
        }
        console.log('comments', this.comments);
      }, error => {
        console.log('error', error);
        this.loading = false;
      });
  }

  onSubmitmsg(e, id, type) {
    // alert('hello');
    if (e.keyCode === 13 || type === 'submit') {
      this.user.commentBy = localStorage.getItem('username');
      if (this.user.commentBy === null) {
        this.open();
      } else {
        this.user.fighter_id = id;
        this.loading = true;
        console.log('user', this.user);
        this.fighterService.addComment(this.user)
          .subscribe((res) => {
            console.log('res', res);
            this.loading = false;
            this.comments.push(res.data);
            if (this.comments.length > 0) {
              this.showComment = false;
            }
            this.user = {};
          }, error => {
            console.log('error', error);
            this.loading = false;
          });
      }
    }
  }

  onNameSubmit() {
    localStorage.setItem('username', this.user.commentBy);
    this.display = 'block';
  }

  getFighter(country, pg, limit) {
    this.loading = true;
    this.fighterService.getFighterList(country, pg, limit)
      .subscribe((res) => {
        this.loading = false;
        if (res.data.totalRecords !== 0) {
          this.dataShow = false;
          res.data.result.filter((x) => {
            x.show= false;
            this.fighterData.push(x);
          });
          this.fighterData.filter((x) => {
            if (x.link === null || x.link === undefined) {
              x.link = 'https://www.cornwallbusinessawardsL.co.uk/wp-content/uploads/2017/11/dummy450x450.jpg';
            }
          });
          this.total = res.data.totalRecords;
          console.log('Herer', this.fighterData, this.total);
        } else {
          this.dataShow = true;
          this.fighterData = [];
        }
      }, error => {
        this.loading = false;
        console.log('error', error);
      });

  }

  onScroll() {
    console.log("scrolled in");
    // if (this.fighterData.length < this.total) {
      // Update ending position to select more items from the array
      this.p = this.p + 1;
      this.getFighter(this.cntName, this.p, this.limit);
      console.log("scrolled");
    // }
    // } else {
    //   console.log('in else');
    //   this.isFullListDisplayed = true;
    // }
  }

  showFighter(data) {
    this.currentFighter = data;
    // this.href = "https://www.cnox.io?id=123";
    this.href = (this.platformLocation as any).href + '?id=' + this.currentFighter.fighter_id;
    console.log('href', this.href);
    this.popupVisible = true;
  }

  onTabClick(type) {
    console.log('type', type);
    if (type === 'world') {
      this.changeClass = true;
      this.cntName = '';
      this.getFighter('', this.p, this.limit);
    } else {
      this.changeClass = false;
      this.cntName = type;
      this.fighterData = [];
      this.getFighter(type, this.p, this.limit);
    }
  }

  onTabButtonClick(tab) {
    console.log('type', tab);
    if (tab === '#tab01') {
      this.tabName = tab;
    } else if (tab === '#tab02') {
      this.tabName = tab;
    } else if (tab === '#tab03') {
      this.tabName = tab;
    }
  }

  onKeyUp(e) {
    console.log('event', e);
  }

  openModal(data, i) {
    this.display = 'block';
    this.currentFighter = data;
    this.tabName = '#tab01';
    this.href = (this.platformLocation as any).href + '?id=' + this.currentFighter.fighter_id;
    console.log('href', this.href);
    this.getFighterById(this.currentFighter.fighter_id);
    console.log('data', this.currentFighter);
    this.currentPage = i;
  }

  changePage(index: number): void {
    this.currentPage += index;
    this.loading = true;
    this.tabName = '#tab01';
    this.fighterData.filter((x, i) => {
      if (i === this.currentPage) {
        let data = x;
        this.getFighterById(data.fighter_id);
        this.loading = false;
      }
    });
  }

  open() {
    this.displayName = 'block';
    this.display = 'none';
  }

  closeModal() {
    if (this.displayName === 'block') {
      this.displayName = 'none';
      this.display = 'block';
    } else {
      this.display = 'none';
    }
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
        this.getFighter(this.searchText, this.p, this.limit);
      }
    });
    // window.location.reload();
  }

  getPage(page: number) {
    this.loading = true;
    console.log('page', page);
    this.p = page;
    this.getFighter(this.cntName, page, this.limit);
  }
}
