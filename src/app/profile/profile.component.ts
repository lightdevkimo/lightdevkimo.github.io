import { Component, OnInit } from '@angular/core';
import { user_info, rentApartment } from '../_models/user.model';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { map, timeout } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  user_info: user_info;
  rentApartmentsReq: rentApartment[];
  apartmentRequested:[]=[];
  apartmentApproved:[]=[];
  rentApartmentsConf: rentApartment[];
  OwnerApartmentRequests=[];
  apartmentsDetailsReq = [];
  apartmentsDetailsConf = [];
  Owner_apartments_request = [];

  editMode = false;
  currentCard: number;
  errorReq: string = '';
  errorConf: string = '';
  error:string = '';
  errorApartmentRequested:string='';
  errorapartmentApproved:string='';
  errorOwnerApartmentRequests:string='';


  peopleNames=[]
  personName=""

  url = 'https://saknweb.herokuapp.com/apartments/';

  ngOnInit(): void {
    this.user_info = JSON.parse(localStorage.getItem('user_info'));
    this.getRentApartmentReq();
    this.getRentApartmentConf();
    this.getApartmentRequested();
    this.getApartmentApproved();
    this.getOwnerApartmentRequests();
  }

  ConfirmRequest(index:number) {
    this.http
      .put('https://saknweb.herokuapp.com/api/rent/'+this.OwnerApartmentRequests[index]['id'],{}, {headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))})

      .subscribe(
        (data) => {
          this.router.navigateByUrl('/home');
        }
        ,(err) => {
          console.log(err);

        }
        );
  }


  RejectRequest(index:number) {
    this.http
      .delete(
        'https://saknweb.herokuapp.com/api/rent/' + this.OwnerApartmentRequests[index]['id'],{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}
      )
      .subscribe((data) => {
        this.router.navigateByUrl('/home');
      },(err) => {
          console.log(err);

        }
        );
  }


  getOwnerApartmentRequests() {
    this.http
      .get<{ data: rentApartment[] }>('https://saknweb.herokuapp.com/api/rent', {
        params: new HttpParams()
          .append('owner', this.user_info['id'])
          .append('status', 'requested'),
          headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))
      })

      .subscribe(
        (res) => {
          this.OwnerApartmentRequests = res['data'];
          for (let r of res['data']) {
            this.showApart(r['apartment_id'], 'req','owner');
            this.getUserInfo(r['user_id'])
          }
        },
        (err) => {
          for (const e in err.error.errors) {
            this.errorOwnerApartmentRequests += err.error.errors[e];
          }
        }
      );
  }

  getUserInfo(userId:number):any{
    this.http.get('https://saknweb.herokuapp.com/api/user/'+userId).subscribe(
      data=>{
        this.personName =  data['data']['name']
        this.peopleNames.push(this.personName)
      }
    )
  }


  getApartmentRequested() {
    this.http
      .get('https://saknweb.herokuapp.com/api/apartement/requested',
      {
        params: new HttpParams()
        .append('owner_id', this.user_info['id']),
        headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))
      })

      .subscribe(
        (data) => {
          this.apartmentRequested = data['data'];
          console.log(data)
        },
        (err) => {
          for (const e in err.error.errors) {
            this.errorApartmentRequested += err.error.errors[e];
          }
        }
      );
  }

  getApartmentApproved() {
    this.http
      .get('https://saknweb.herokuapp.com/api/apartement/approved',
      {
        params: new HttpParams()
        .append('owner_id', this.user_info['id']),
        headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))
      })

      .subscribe(
        (data) => {
          this.apartmentApproved = data['data'];
          console.log(data)
        },
        (err) => {
          for (const e in err.error.errors) {
            this.errorapartmentApproved += err.error.errors[e];
          }
        }
      );
  }

  changePassword(data:any) {
    data['email']=this.user_info['email']
    this.http
      .post('https://saknweb.herokuapp.com/api/user/changepassword',data,{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))})

      .subscribe(
        (data) => {
            console.log(data);
        },
        (err) => {
          console.log(err);
          for (const e in err.error.errors) {
            this.error += err.error.errors[e];
          }
        }
      );
  }

  getRentApartmentReq() {
    this.http
      .get<{ data: rentApartment[] }>('https://saknweb.herokuapp.com/api/rent', {
        params: new HttpParams()
          .append('user', this.user_info['id'])
          .append('status', 'requested'),
          headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))
      })

      .subscribe(
        (res) => {
          this.rentApartmentsReq = res['data'];
          for (let r of res['data']) {
            this.showApart(r['apartment_id'], 'req','user');
          }
        },
        (err) => {
          for (const e in err.error.errors) {
            this.errorReq += err.error.errors[e];
          }
        }
      );
  }
  getRentApartmentConf() {
    this.http
      .get<{ data: rentApartment[] }>('https://saknweb.herokuapp.com/api/rent', {
        params: new HttpParams()
          .append('user', this.user_info['id'])
          .append('status', 'confirmed'),
          headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))
      })

      .subscribe(
        (res) => {
          this.rentApartmentsConf = res['data'];
          for (let r of res['data']) {
            this.showApart(r['apartment_id'], 'conf','user');
          }
        },
        (err) => {
          for (const e in err.error.errors) {
            this.errorConf += err.error.errors[e];
          }
        }
      );
  }

  showApart(id: number, status: string,type:string) {
    this.http
      .get('https://saknweb.herokuapp.com/api/apartements/' + id)
      .subscribe((res) => {
        if (status == 'req' && type == 'user') {
          this.apartmentsDetailsReq.push(res['data']);
        } else if (status == 'conf' && type == 'user') {
          this.apartmentsDetailsConf.push(res['data']);
        } else {
          this.Owner_apartments_request.push(res['data']);

        }
      });
  }

  withdraw(index: number) {
    this.http
      .delete(
        'https://saknweb.herokuapp.com/api/rent/' + this.rentApartmentsReq[index]['id'],{ headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))}
      )
      .subscribe((res) => {
        console.log(res);
      });

    this.router.navigateByUrl('/find');
  }

  changeMode(mode: boolean, cardId: number) {
    this.editMode = mode;
    this.currentCard = cardId;
  }

  updateComment(form: NgForm, rentApart: number) {
    this.http
      .post(
        'https://saknweb.herokuapp.com/api/comment',
        {
          comment: form.value.comment,
        },
        {
          params: new HttpParams()
            .append('user', rentApart['user_id'])
            .append('apartment', rentApart['apartment_id']),
            headers: new HttpHeaders().append('Authorization','Bearer '+localStorage.getItem('token'))

        }

      )
      .subscribe(
        (res) => {
          location.reload();
        },
        (err) => {
          location.reload();
        }
      );
    this.changeMode(false, null);
  }
}
