import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
})
export class ApartmentsComponent implements OnInit {
  AllApartements: [] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.Apartements();
  }

  Apartements() {
    this.http
      .get('https://saknweb.herokuapp.com/api/apartements', {
        headers: new HttpHeaders().append(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      })
      .subscribe((data) => {
        this.AllApartements = data['data'];
        console.log(this.AllApartements);

        setTimeout(() => {
          $('#datatableapartements').DataTable({
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            lengthMenu: [10, 20, 50],
          });
        }, 1);
      });
  }
}
