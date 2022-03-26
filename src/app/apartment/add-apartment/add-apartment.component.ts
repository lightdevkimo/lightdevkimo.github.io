import { img, user_info } from './../../_models/user.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { apart, cities } from 'src/app/_models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addApartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.scss'],
})
export class AddApartmentComponent implements OnInit {
  user_info: user_info;

  imagesUrl!: File;
  img!: any;
  error = [];

  gov: cities[] = [];
  cities: cities[] = [];
  test = true;

  constructor(
    private http: HttpClient,
    private data: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getcities();
  }

  getcities() {
    this.http.get('https://saknweb.herokuapp.com/api/governates').subscribe((data) => {
      for (let i = 0; i < data['data'].length; i++) {
        this.gov[i] = data['data'][i];
      }
    });
  }

  choosegov(event: any) {
    this.http
      .get('https://saknweb.herokuapp.com/api/findcities/'.concat(event.target.value))
      .subscribe((data) => {
        for (let i = 0; i < data['data'].length; i++) {
          this.cities[i] = data['data'][i];
        }
      });
    this.test = true;
  }

  addApartment(data: any) {
    let db = new FormData();

    for (const key in data) {
      db.append(key, data[key]);
    }
    console.log(this.imagesUrl);

    // let owner_id:any= 1;
    db.append('images', this.imagesUrl);
    db.append('owner_id', JSON.parse(localStorage.getItem('user_info'))['id']);
    db.append('city_id', data['state']);

    this.http
      .post('https://saknweb.herokuapp.com/api/apartements', db, {
        headers: new HttpHeaders().append(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigateByUrl('/profile');
        },
        (err) => {
          this.error=[]
          for (const e in err.error.errors) {
            // console.log(err.error.errors[e]);

            this.error.push( err.error.errors[e]);
          }
        }
      );
  }

  selectFiles(event): void {
    this.imagesUrl = event.target.files[0];
    console.log(this.imagesUrl);
  }
}
