//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { CarouselModule } from 'primeng/carousel';
import { LightboxModule } from '@tomscript/ngx-lightbox';

// Pipes
import { TranslatePipe } from './pipes/translate.pipe';

// Interceptors
import { AuthInterceptor } from './interceptors/auth-interceptor';

// Services
import { TranslateService } from './services/translate.service';
import { WorkService } from './services/work.service';

//Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListWorksComponent } from './components/list-works/list-works.component';
import { ListServicesComponent } from './components/list-services/list-services.component';
import { ServiceComponent } from './components/service/service.component';
import { ContactComponent } from './components/contact/contact.component';
import { AddWorksDoneComponent } from './components/data-managment/works-done/add-works-done/add-works-done.component';
import { AddTagsComponent } from './components/data-managment/tags/add-tags/add-tags.component';
import { ListTagsComponent } from './components/data-managment/tags/list-tags/list-tags.component';
import { ListWorksDoneComponent } from './components/data-managment/works-done/list-works-done/list-works-done.component';
import { DataDashboardComponent } from './components/data-managment/data-dashboard/data-dashboard.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TagRegistrationComponent } from './components/tag-registration/tag-registration.component';
import { WorksTagRegistrationComponent } from './components/tag-registration/works-tag-registration/works-tag-registration.component';
import { EditWorksDoneComponent } from './components/data-managment/works-done/edit-works-done/edit-works-done.component';
import { AddOfferComponent } from './components/data-managment/offers/add-offer/add-offer.component';
import { ListOffersComponent } from './components/data-managment/offers/list-offers/list-offers.component';
import { EditOfferComponent } from './components/data-managment/offers/edit-offer/edit-offer.component';
import { OffersComponent } from './components/offers/offers.component';


import * as Hammer from 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    'pan': {
      direction: Hammer.DIRECTION_ALL,
    }
  }
}

export function translateFactory(provider: TranslateService){
  return () => provider.getData();
}

export function workFactory(provider: WorkService){
  return () => provider.getData();
}

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    ListWorksComponent,
    ListServicesComponent,
    ServiceComponent,
    ContactComponent,
    AddWorksDoneComponent,
    AddTagsComponent,
    ListTagsComponent,
    ListWorksDoneComponent,
    DataDashboardComponent,
    LoginComponent,
    SignupComponent,
    TagRegistrationComponent,
    WorksTagRegistrationComponent,
    EditWorksDoneComponent,
    AddOfferComponent,
    ListOffersComponent,
    EditOfferComponent,
    OffersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    CheckboxModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    DropdownModule,
    KeyFilterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    CrystalLightboxModule,
    CarouselModule,
    LightboxModule
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    WorkService,
    {
      provide: APP_INITIALIZER,
      useFactory: workFactory,
      deps: [WorkService],
      multi: true
    },
    {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
