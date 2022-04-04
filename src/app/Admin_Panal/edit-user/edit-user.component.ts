import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user_info } from 'src/app/_models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  id:number;
  user: user_info[] = []


    constructor(private activeRouter: ActivatedRoute, private http: HttpClient, private router: Router) { }
  isLoading = false;

  error:string=null
  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id']
    this.Users()
  }

  Users() {
    this.http.get('https://saknweb.herokuapp.com/api/user/' + this.id, { headers: new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token')) }).subscribe(data => {
      this.user = data['data'];

    });
  }

  onsave(data: any){
    this.http.put('https://saknweb.herokuapp.com/api/user/' + this.id,data.value, { headers: new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token')) }).subscribe(data => {

      this.router.navigateByUrl('/admin-panal/statics');


    });

  }


}
