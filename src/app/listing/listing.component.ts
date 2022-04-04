import { cities, apart } from './../_models/user.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getcities();

  }

  public dragResult = 1;
  public changeResult = 1;
  gov: cities[] = [];
  cities: cities[] = [];
  apart: apart[] = [];
  test = true;
  url="https://saknweb.herokuapp.com/apartments/"
  error=""

  getcities() {
    this.http.get('https://saknweb.herokuapp.com/api/governates').subscribe(data => {

      for (let i = 0; i < data['data'].length; i++) {
        this.gov[i] = (data['data'][i]);
      }
    });

  }



  choosegov(event: any) {
    this.http.get('https://saknweb.herokuapp.com/api/findcities/'.concat(event.target.value)).subscribe(data => {
      for (let i = 0; i < data['data'].length; i++) {
        this.cities[i] = (data['data'][i]);
      }
    });
    this.test = true;
  }


  showVal(event: any) {
    this.changeResult = parseFloat(event.target.value);

  }



  onSearch(data: any) {

    let kimo: any;
    for (let i = 0; i < this.cities.length; i++) {

      if (this.cities[i]['name'] === data['state']) {
        kimo = this.cities[i]['id']
      }
    }

    let params = new HttpParams();
    params =data['gender'] ? params.append('gender', data['gender']):params;
    params =data['min_price'] ? params.append('min_price', data['min_price']):params;
    params =data['min_price']? params.append('max_price', +data['min_price']*2):params;
    params =kimo? params.append('city_id', kimo):params;
    console.log(params);

    this.http.get('https://saknweb.herokuapp.com/api/apartement/search', { params: params })
      .subscribe((result) => {
        this.error = ""
        this.apart=[];
        for (let i = 0; i < result['data'].length; i++) {
          this.apart[i] = (result['data'][i]);
        }

      },
      (err) => {
        this.apart=[];
        this.error = err.error.error
      })
    console.log(this.apart);
  }




}




