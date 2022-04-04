import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { SignupData } from 'src/app/_models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  signupData: SignupData;
  error=[];
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  signup(data) {
    this.http.post('https://saknweb.herokuapp.com/api/register', data).subscribe((res) => {
        console.log(res);
        localStorage.setItem('token', res['token']);
        localStorage.setItem('role', res['role']);
        localStorage.setItem('salt', res['salt']);
        localStorage.setItem("user_info",JSON.stringify(res['data']));
        this.auth.checktoken(true);
        this.router.navigateByUrl('/find');
      },
      (err) => {
        this.error = []
        for (const e in err.error.errors) {
          // console.log(err.error.errors[e]);

          this.error.push( err.error.errors[e]);
        }
      }
    );
  }
}
