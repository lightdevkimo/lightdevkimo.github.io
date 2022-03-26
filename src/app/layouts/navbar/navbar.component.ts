import { user_info } from './../../_models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  user_info: user_info;
  isLogin = false;
  current = '';
  role: number;
  changeActive(active: string) {
    this.current = active;
  }

  ngOnInit(): void {
    this.user_info = JSON.parse(localStorage.getItem('user_info'));
    //user
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

    if (localStorage.getItem('token')) {
      this.isLogin = true;
    }

    // this.auth.checktoken(true);
    // this.isLogin=this.token.isLogin;
    this.auth.changeLogin.subscribe((res) => {
      this.isLogin = res;
    });
    console.log(this.auth.isLogin);
  }
  destorySession() {
    //this.isLogin=true
    this.auth.checktoken(false);
    this.router.navigateByUrl('/home');
    // this.isLogin=false;
  }
}
