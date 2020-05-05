import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from 'ngx-spinner';
import {TestService} from './service/test.service';
import {NgxFileDropModule} from 'ngx-file-drop';
import {FileSelectDirective} from 'ng2-file-upload';
import { SelectDropDownModule } from 'ngx-select-dropdown'


@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
  ],
  imports: [
    BrowserModule,
    NgxFileDropModule,
    SelectDropDownModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
