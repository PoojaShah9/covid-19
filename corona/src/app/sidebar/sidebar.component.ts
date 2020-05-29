import {Component, OnInit} from '@angular/core';
import {FightersService} from "../services/fighters.service";

declare var burgerMenu: Function;
declare var mobileMenuOutsideClick: Function;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  totalLikes;
  totalViews = 500;
  totalDonation = 100;
  constructor(private fightersService: FightersService) { }

  ngOnInit(): void {
    burgerMenu();
    mobileMenuOutsideClick();
    this.fightersService.getTotal()
      .subscribe((res) => {
        console.log('res', res);
        this.totalLikes = res.data[0].totalLikes;
      });
  }

}
