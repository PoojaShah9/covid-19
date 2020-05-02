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
// import {DxTemplateModule, DxButtonModule, DxPopupModule, DxPopoverModule} from 'devextreme-angular';
// import { DxTileViewModule, DxSelectBoxModule } from 'devextreme-angular';

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
    AppRoutingModule,
    HttpClientModule,
    ShareModule,
    // DxTemplateModule, DxButtonModule, DxPopupModule, DxPopoverModule,
    // DxTileViewModule, DxSelectBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
