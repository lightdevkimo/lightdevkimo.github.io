import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { contact } from '../_models/user.model';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  error: string = '';

  constructor(private http: HttpClient, private data: DataService ,private router:Router) { }

  ngOnInit(): void {
  }

  Sent(postData: contact) {
    this.http.post('https://saknweb.herokuapp.com/api/contact-us', postData).subscribe(data=>{
      this.router.navigateByUrl('/home');
    },error=>{
      console.log(error);
      for (const e in error.error.errors) {
        this.error += error.error.errors[e];
      }
    });

  }

}
