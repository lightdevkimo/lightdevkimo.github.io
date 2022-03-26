import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { OverlayComponent } from './layouts/overlay/overlay.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ListingComponent } from './listing/listing.component'
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import {  HttpClientModule } from '@angular/common/http';
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './Admin_Panal/users/users.component';
import { EditUserComponent } from './Admin_Panal/edit-user/edit-user.component';
import { AddApartmentComponent } from './apartment/add-apartment/add-apartment.component';
import { EditApartmentComponent } from './apartment/edit-apartment/edit-apartment.component';
import { AsideComponent } from './Admin_Panal/aside/aside.component';
import { StaticsComponent } from './Admin_Panal/statics/statics.component';
import { ApartmentsComponent } from './Admin_Panal/apartments/apartments.component';
import { MessagesComponent } from './Admin_Panal/messages/messages.component';
import { AddCityComponent } from './Admin_Panal/add-city/add-city.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OverlayComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    SignupComponent,
    OverlayComponent,
    LoginComponent,
    ListingComponent,
    LoadingSpinnerComponent,
    ApartmentDetailsComponent,
    ProfileComponent,
    UsersComponent,
    EditUserComponent,
    AddApartmentComponent,
    EditApartmentComponent,
    AsideComponent,
    StaticsComponent,
    ApartmentsComponent,
    MessagesComponent,
    AddCityComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
