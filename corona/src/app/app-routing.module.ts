import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {BlogComponent} from './blog/blog.component';
import {GalleryComponent} from './gallery/gallery.component';
import {SingleComponent} from './single/single.component';
import {ContactComponent} from './contact/contact.component';
import {PaymentComponent} from "./payment/payment.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'single', component: SingleComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'pay', component: PaymentComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
