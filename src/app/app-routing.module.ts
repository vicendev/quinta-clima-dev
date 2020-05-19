import { OffersComponent } from './components/offers/offers.component';
import { ListOffersComponent } from './components/data-managment/offers/list-offers/list-offers.component';
import { AddOfferComponent } from './components/data-managment/offers/add-offer/add-offer.component';
import { EditWorksDoneComponent } from './components/data-managment/works-done/edit-works-done/edit-works-done.component';
import { WorksTagRegistrationComponent } from './components/tag-registration/works-tag-registration/works-tag-registration.component';
import { TagRegistrationComponent } from './components/tag-registration/tag-registration.component';
import { AuthGuard } from './components/auth/auth.guard';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DataDashboardComponent } from './components/data-managment/data-dashboard/data-dashboard.component';
import { ListWorksDoneComponent } from './components/data-managment/works-done/list-works-done/list-works-done.component';
import { ListTagsComponent } from './components/data-managment/tags/list-tags/list-tags.component';
import { AddTagsComponent } from './components/data-managment/tags/add-tags/add-tags.component';
import { AddWorksDoneComponent } from './components/data-managment/works-done/add-works-done/add-works-done.component';
import { ServiceComponent } from './components/service/service.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ListServicesComponent } from './components/list-services/list-services.component';
import { ListWorksComponent } from './components/list-works/list-works.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { EditOfferComponent } from './components/data-managment/offers/edit-offer/edit-offer.component';

const routes: Routes = [
  {path: '', component: ListWorksComponent},
  {path: 'list-services', component: ListServicesComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'add-worksdone', component: AddWorksDoneComponent, canActivate: [AuthGuard] },
  {path: 'add-tags', component: AddTagsComponent, canActivate: [AuthGuard] },
  {path: 'list-tags', component: ListTagsComponent, canActivate: [AuthGuard] },
  {path: 'list-worksdone', component: ListWorksDoneComponent, canActivate: [AuthGuard] },
  {path: 'dashboard', component: DataDashboardComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent },
  {path: 'tag-registration', component: TagRegistrationComponent},
  {path: 'works-tag-registration/:id', component: WorksTagRegistrationComponent},
  {path: 'edit-worksdone/:id', component: EditWorksDoneComponent, canActivate: [AuthGuard] },
  {path: 'add-offer', component: AddOfferComponent, canActivate: [AuthGuard] },
  {path: 'list-offers', component: ListOffersComponent, canActivate: [AuthGuard] },
  {path: 'edit-offer/:id', component: EditOfferComponent, canActivate: [AuthGuard] },
  {path: 'offers', component: OffersComponent },
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
