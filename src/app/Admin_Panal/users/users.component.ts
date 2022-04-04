import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { user_info } from 'src/app/_models/user.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: user_info[] = [];
  usersub: Subscription;
  error: string = '';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Users();
  }

  Users() {
    this.usersub = this.http
      .get('https://saknweb.herokuapp.com/api/users', {
        headers: new HttpHeaders().append(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      })
      .subscribe((data) => {
        for (let i = 0; i < data['data'].length; i++) {
          this.users[i] = data['data'][i];

        }

        setTimeout(() => {
          $('#datatableexample').DataTable({
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            lengthMenu: [10, 20, 50],
          });
        }, 1);
      });
  }

  destorySession() {
    //this.isLogin=false
  }

  ngOnDestroy(): void {
    this.usersub.unsubscribe();
  }

  onDelete(id: number) {
    this.http
      .delete('https://saknweb.herokuapp.com/api/user/' + id, {
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
    this.router.navigateByUrl('/admin-panal/statics');

  }
}
