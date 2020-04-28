import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AboutComponent} from './about/about.component';
import {BlogComponent} from './blog/blog.component';
import {ContactComponent} from './contact/contact.component';
import {GalleryComponent} from './gallery/gallery.component';
import {SingleComponent} from './single/single.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {ngxLoadingAnimationTypes, NgxLoadingModule} from 'ngx-loading';
import {ShareButtonsModule} from "@ngx-share/buttons";
import {ShareButtonsConfig} from "@ngx-share/core";

const customConfig: ShareButtonsConfig = {
  include: ['facebook', 'twitter', 'linkedin', 'reddit', 'whatsapp', 'telegram', 'print', 'email'],
  theme: 'circles-dark',
  autoSetMeta: true,
  twitterAccount: 'ankitsharma_007'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    GalleryComponent,
    SingleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ShareButtonsModule.withConfig(customConfig),
    HttpClientJsonpModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(1,1,1,0.57)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
