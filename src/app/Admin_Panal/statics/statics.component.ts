import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.scss']
})
export class StaticsComponent implements OnInit {

  total_users:number
  owners:number
  users:number
  admins:number
  requested_apartements:number
  approved_apartements:number
  count_messages:number
  welcomeUser:string=JSON.parse(localStorage.getItem('user_info'))['name']

  constructor(private http: HttpClient,private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.TotalUsers()
    this.Owners()
    this.Users()
    this.Admins()
    this.RequestedApartements()
    this.ApprovedApartements()
    this.ContactUS()
  }



  TotalUsers(){
    this.http.get('https://saknweb.herokuapp.com/api/statistics/total_users',{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}).subscribe(data => {
      this.total_users=data['data'];
    });
  }

  Owners(){
    this.http.get('https://saknweb.herokuapp.com/api/statistics/owners',{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}).subscribe(data => {
      this.owners=data['data'];
    });
  }

  Users(){
    this.http.get('https://saknweb.herokuapp.com/api/statistics/users',{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}).subscribe(data => {
      this.users=data['data'];
    });
  }

  Admins(){
    this.http.get('https://saknweb.herokuapp.com/api/statistics/admins',{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}).subscribe(data => {
      this.admins=data['data'];
    });
  }

  RequestedApartements(){
    this.http.get('https://saknweb.herokuapp.com/api/statistics/requested_apartements',{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}).subscribe(data => {
      this.requested_apartements=data['data'];
    });
  }


  ApprovedApartements(){
    this.http.get('https://saknweb.herokuapp.com/api/statistics/approved_apartements',{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}).subscribe(data => {
      this.approved_apartements=data['data'];
    });
  }

  ContactUS(){
    this.http.get('https://saknweb.herokuapp.com/api/statistics/count_messages',{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}).subscribe(data => {
      this.count_messages=data['data'];
    });
  }


  destorySession(){
    this.auth.checktoken(false);
    this.router.navigateByUrl('/home');
  }

}
