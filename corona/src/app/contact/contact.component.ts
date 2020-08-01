import {Component, OnInit} from '@angular/core';
import {FightersService} from "../services/fighters.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  email: any = {};
  emailId = 'covid.champions@gmail.com';

  constructor(private fightersService: FightersService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  onSubmite() {
    console.log('email', this.email);
    this.email.subject = 'About Covid-19 Website';
    this.email.html = '<p>' + this.email.message + '</p><br><br>--From<br>' + this.email.name;
    console.log('html', this.email.html);
    this.fightersService.sendMail(this.email)
      .subscribe((res) => {
        if (res.error) {
          this.toastr.error(res.message);
        } else {
          this.toastr.success(res.message);
        }
        console.log('res', res);
      }, (err) => {
        console.log('err', err);
      });
  }

}
