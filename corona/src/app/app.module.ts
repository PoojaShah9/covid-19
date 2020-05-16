import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ShareModule} from '@ngx-share/core';
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
import {HttpClientModule} from '@angular/common/http';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from 'ngx-loading';
import {FormsModule} from "@angular/forms";
import {
  DxButtonModule,
  DxListModule,
  DxPopoverModule,
  DxPopupModule,
  DxTemplateHost,
  DxTemplateModule
} from 'devextreme-angular';
import {PaymentComponent} from './payment/payment.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { DonationComponent } from './donation/donation.component';

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
    SingleComponent,
    PaymentComponent,
    DonationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ShareModule,
    FormsModule,
    InfiniteScrollModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(1,1,1,0.57)',
      backdropBorderRadius: '4px',
      fullScreenBackdrop: true,
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'}),
    DxTemplateModule,
    DxButtonModule,
    DxPopupModule,
    DxPopoverModule,
    DxListModule
  ],
  providers: [DxTemplateHost],
  bootstrap: [AppComponent]
})
export class AppModule {
}
