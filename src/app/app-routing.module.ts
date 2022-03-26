import { AuthGuard } from './_guards/auth.guard';
import { OwnerGuard } from './_guards/owner.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { StaticsComponent } from './Admin_Panal/statics/statics.component';
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';
import { AddApartmentComponent } from './apartment/add-apartment/add-apartment.component';
import { EditApartmentComponent } from './apartment/edit-apartment/edit-apartment.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { EditUserComponent } from './Admin_Panal/edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './Admin_Panal/users/users.component';
import { ApartmentsComponent } from './Admin_Panal/apartments/apartments.component';
import { MessagesComponent } from './Admin_Panal/messages/messages.component';
import { UserGuard } from './_guards/user.guard';
import { AddCityComponent } from './Admin_Panal/add-city/add-city.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'apartment', children: [
      { path: 'add', component: AddApartmentComponent },
      { path: 'edit', component: EditApartmentComponent }
    ],canActivate:[OwnerGuard]
  },
  { path: 'find', component: ListingComponent },
  { path: 'find/apart-details/:id', component: ApartmentDetailsComponent },
  { path: 'profile', component: ProfileComponent  },
  //canActivate:[UserGuard, OwnerGuard,AuthGuard]
  {
    path: 'admin-panal', children: [
      { path: 'statics', component: StaticsComponent },
      { path: 'apartments', component: ApartmentsComponent },
      { path: 'massages', component: MessagesComponent },

      {path: 'add/City', component:AddCityComponent},
      {path: 'add-apartment', component: AddApartmentComponent},
      {path: 'edit-apartment', component: EditApartmentComponent},
      {path: 'all-apartment', component: EditApartmentComponent},

      { path: 'users', component: UsersComponent },
      { path: 'users/edit/:id', component: EditUserComponent },
      { path: 'users/profile', component: ProfileComponent },
    ],canActivate:[AuthGuard]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
