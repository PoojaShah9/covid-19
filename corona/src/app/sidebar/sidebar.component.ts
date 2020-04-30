import {Component, OnInit} from '@angular/core';

declare var burgerMenu: Function;
declare var mobileMenuOutsideClick: Function;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    burgerMenu();
    mobileMenuOutsideClick();
  }

}
