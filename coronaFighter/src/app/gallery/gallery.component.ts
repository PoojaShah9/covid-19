import {Component, OnInit} from '@angular/core';

declare var magnificPopup: Function;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    magnificPopup();
  }

}
