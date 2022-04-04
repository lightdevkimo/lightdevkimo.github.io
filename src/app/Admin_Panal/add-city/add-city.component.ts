import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnInit {
  cities: [];
  error:string=''
  constructor(private http: HttpClient, private router:Router) {}

  ngOnInit(): void {
    this.Cities();
  }

  AddCity(data:any) {
    this.http.post('https://saknweb.herokuapp.com/api/cities',data
    ,{headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))})
      .subscribe(
        (data) => {
          this.router.navigateByUrl('/admin-panal/statics')
          this.router.navigateByUrl('/admin-panal/add/City')

        },
        (err) => {
          for (const e in err.error.errors) {
            this.error += err.error.errors[e];
          }
        }
      );
  }

  Cities() {
    this.http
      .get('https://saknweb.herokuapp.com/api/cities', {
        headers: new HttpHeaders().append(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      })
      .subscribe((data) => {
        this.cities = data['data'];
        console.log(this.cities);
        setTimeout(() => {
          $('#datatablecities').DataTable({
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            lengthMenu: [10, 20, 50],
          });
        }, 1);
      });
  }


  deleteCity(id: number) {
    this.http
      .delete('https://saknweb.herokuapp.com/api/cities/' + id, {
        headers: new HttpHeaders().append(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          for (const e in err.error.errors) {
            this.error += err.error.errors[e];
          }
        }
      );
    //this.router.navigateByUrl('/admin-panal/statics');
  }




}
