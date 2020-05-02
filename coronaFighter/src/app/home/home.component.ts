import {Component, OnInit} from '@angular/core';
import {FightersService} from '../services/fighters.service';
// import { DxTemplateModule, DxButtonModule, DxPopupModule, DxPopoverModule } from 'devextreme-angular';
// import { DxTileViewModule, DxSelectBoxModule } from 'devextreme-angular';
declare var magnificPopup: Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fighterService: FightersService) {
  }

  fighterData: any = [];
  cntName: string = null;
  photoArray: any = ['https://ak.picdn.net/offset/photos/5e9f12f3d164c0404ea4d716/medium/offset_930275.jpg',
    'https://www.themachinemaker.com/upload/innovation/Dr-Pravina-Gondalia.jpg',
    'https://media.istockphoto.com/photos/young-asian-female-doctor-with-mask-show-ok-with-both-picture-id631181544?k=6&m=631181544&s=170667a&w=0&h=NY0meO9RIdUprv3VGpXcuBgbJKF6IPDDKnsUeaRuoAc=',
    'https://c8.alamy.com/comp/ABJ1WE/traffic-policeman-with-face-mask-bangkok-thailand-ABJ1WE.jpg',
    'https://thenypost.files.wordpress.com/2020/03/200321-coronavirus-masks.jpg',
    'https://i.pinimg.com/originals/2c/a8/69/2ca869fa7b11fae2a0b15e83c318a164.jpg'];

  ngOnInit(): void {
    // this.cntName = 'India';
    this.getFighter('');
  }

  getFighter(country) {
    // this.loading = true;
    this.fighterService.getFighterList(country)
      .subscribe((res) => {
        if (res.data) {
          // this.loading = false;
          this.fighterData = res.data;
          console.log('Herer', this.fighterData);
          magnificPopup();
          this.fighterData.filter((x, i) => {
            x.link =  this.photoArray[Math.floor(Math.random() * Math.floor(this.photoArray.length))];
          });
        }
      }, error => {
        // this.loading = false;
        console.log('error', error);
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

}
