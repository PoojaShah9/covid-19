import {Component, ElementRef} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {MainserviceService} from "./mainservice.service";
import {TestService} from "./service/test.service";

import {NgxFileDropEntry} from 'ngx-file-drop';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';

declare var uploadFile;
declare var deleteFile;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'demo';
  images = [];
  displayImage = [];
  selectedFile = [];
  displayImg = 'block';
  arrayForApi = [];
  tab = 'tab1';
  fighter: any = {};

  filenamestr = '';
  validfile: boolean = true;
  files: NgxFileDropEntry[] = [];
  uploadData: any = {};

  constructor(private spinner: NgxSpinnerService, private testService: TestService,
              private el: ElementRef,) {
  }

  uploadImages(callback) {
    const that = this;
    this.spinner.show();
    let cnt = 0;
    if (this.selectedFile.length > 0) {
      for (let i = 0; i < this.selectedFile.length; i++) {
        uploadFile(this.selectedFile[i], i, function (index, data) {
          cnt++;
          that.arrayForApi.push(data);
          console.log('cnt', cnt, that.selectedFile.length - 1);
          if (cnt === that.selectedFile.length) {
            that.spinner.hide();
            callback('upload Complete');
          }
        });
      }
    } else {
      this.spinner.hide();
      callback('upload Complete');
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      console.log('filesAmount', filesAmount);
      for (let i = 0; i < filesAmount; i++) {
        console.log('event.target.files[i]', event.target.files[i]);
        this.selectedFile.push(event.target.files[i]);
        const reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onImgClose(id) {
    const that = this;
    console.log('idddddd', id);
    console.log('tab', this.tab);
    this.spinner.show();
    if (this.tab === 'tab2') {
      this.images = this.displayImage;
    }
    console.log('this.images[id]', this.images[id]);
    let name = this.images[id].substr(this.images[id].indexOf('%2F') + 3, (this.images[id].indexOf('?')) - (this.images[id].indexOf('%2F') + 3));
    let folder = name.substr(0, 13);
    name = name.substr(name.indexOf('%2F') + 3);
    name = name.replace('%20', ' ');
    if (name === '') {
      // this.images.splice(id, 1);
      // this.selectedFile.splice(id, 1);
      this.selectedFile = [];
      this.images = [];
    } /*else {
      deleteFile(folder, name, function (data) {
        that.displayImage.splice(id, 1);
      });
    }*/
    this.spinner.hide();
  }

  onSubmit() {
    this.spinner.show();
    // upload image time
    console.log('prosct data');
    const that = this;
    this.uploadImages(function (data) {
      console.log('prosct data', data);
      console.log('prosct arrayForApi', that.arrayForApi);
      that.spinner.show();
      (that.arrayForApi).forEach((x) => {
        console.log('fighter', that.fighter);
        if (that.arrayForApi.length > 0) {
          that.fighter.link = that.arrayForApi[0];
        }
        that.testService.newRecord(that.fighter)
          .subscribe((res) => {
            that.spinner.hide();
            console.log('productttttt', res);
            that.arrayForApi = [];
            that.images = [];
            that.selectedFile = [];
            window.location.reload();
          }, (err) => {
            that.spinner.hide();
            console.log('err', err);
            window.location.reload();
            that.arrayForApi = [];
            that.images = [];
            that.selectedFile = [];
          });
      });
    });
  }

  upload() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    this.uploadData.file = inputEl.files;
    this.selectedFile = [];
    this.images = [];
    this.selectedFile.push(inputEl.files[0]);
    this.uploadFile1(inputEl.files[0]);
  }

  uploadFile1(file) {
    console.log('file', file);
    const contentType = file.type;
    const reader = new FileReader();

    reader.onload = (event: any) => {
      console.log(event.target.result);
      this.images.push(event.target.result);
    };

    reader.readAsDataURL(file);
  }

  filechange(event) {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    if (inputEl.files && inputEl.files.length > 0) {
      const filename = inputEl.files[0].name;
      this.filenamestr = filename;
      if (filename.includes('.jpeg') || filename.includes('.png') || filename.includes('.jpg')) {
        this.validfile = true;
        this.upload();
      } else {
        this.validfile = false;
      }
    }

  }

}
