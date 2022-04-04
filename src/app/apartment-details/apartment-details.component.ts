import { apart } from 'src/app/_models/user.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss']
})
export class ApartmentDetailsComponent implements OnInit {

  url = "https://saknweb.herokuapp.com/apartments/"
  apart: apart
  role: number;
  id: string
  peopleComments=[]
  peopleNames=[]
  rentApart :any
  personName=""
  errorReserve:string=""
  constructor(private activeRouter: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (
      localStorage.getItem('salt') ===
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6ImhlbGxvIn0.mzFAbbzRu-Oada93Er2zZj2eDdTcDpe1vLeRLAGCCPc'
    ) {
      this.role = 1;
    } else if (
      localStorage.getItem('salt') ===
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYWJsbGxsIjoiaGhoaGgifQ.YW5xOWv0c2kyAY_GU1M5XZmJehS5wOZcehZg2KIHs-A'
    ) {
      this.role = 0;
    } else if (
      localStorage.getItem('salt') ===
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJieWVieWUiOiJieWVieWUifQ.EO2FQLVSrgS74bZHch0kxu-HzUK56osW8BdT7WShyoU'
    ) {
      this.role = 2;
    }
    this.id = this.activeRouter.snapshot.params['id']
    this.showApart()
    this.showComments()

  }

  Reserve(){
      this.http
        .post(
          'https://saknweb.herokuapp.com/api/rent/',
          {
            'apartment_id':this.id,
            'user_id':JSON.parse(localStorage.getItem('user_info'))['id']
          },{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}
        )
        .subscribe((res) => {
          this.router.navigateByUrl('/profile');

        },
        (err) => {
          for (const e in err.error.errors) {
            this.errorReserve += err.error.errors[e];
          }
        });
  }

  Approve(){
    console.log(localStorage.getItem('token'));
    this.http
      .post('https://saknweb.herokuapp.com/api/apartements/approve/'+this.id,{},
        {headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))})
      .subscribe(
        (data) => {
          this.router.navigateByUrl('/admin-panal/apartments');
        }
        ,(err) => {
          console.log(err);

        }
        );
  }

  Reject(){
    console.log('https://saknweb.herokuapp.com/api/apartements/reject/'+this.id);
    this.http
      .post('https://saknweb.herokuapp.com/api/apartements/reject/'+this.id,{},
        {headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))})
      .subscribe(
        (data) => {
          this.router.navigateByUrl('/admin-panal/apartments');
        }
        ,(err) => {

        }
        );
  }


  showApart() {
    this.http.get('https://saknweb.herokuapp.com/api/apartements/' + this.id).subscribe(data => {

      this.apart = data['data'];

    });

  }

  getUserInfo(userId:number):any{
    this.http.get('https://saknweb.herokuapp.com/api/user/'+userId).subscribe(
      data=>{
        this.personName =  data['data']['name']
        this.peopleNames.push(this.personName)

      }
    )
  }

  showComments() {
    this.http.get('https://saknweb.herokuapp.com/api/comment',
    {
      params: new HttpParams().append(
          "apartment",this.id
          )
    }).subscribe(
      data=>{

        for (let i = 0; i < data['data'].length; i++) {
          this.rentApart = data['data'][i]
          this.peopleComments[i] = (this.rentApart);
          this.getUserInfo(this.rentApart['user_id'])

        }

      },
      err=>{
        console.log(err);


      }
    )

  }


}
