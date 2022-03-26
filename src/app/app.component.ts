import { AuthService } from 'src/app/_services/auth.service';
import { Component,OnInit } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  //token=localStorage.getItem("token");
  ngOnInit(): void {

  }
  title = 'final';
  active="listing";
  role=0;




}
