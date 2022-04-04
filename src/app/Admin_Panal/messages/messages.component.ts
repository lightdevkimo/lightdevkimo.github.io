import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: [] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.ContactUs();
  }


  ContactUs() {
    this.http
      .get('https://saknweb.herokuapp.com/api/contact-us', {
        headers: new HttpHeaders().append(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      })
      .subscribe((data) => {
        this.messages = data['data'];
        console.log(this.messages);

        setTimeout(() => {
          $('#datatablecontactus').DataTable({
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            lengthMenu: [10, 20, 50],
          });
        }, 1);
      });
  }

}
