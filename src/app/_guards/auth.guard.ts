import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators'
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {

  }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //
    if (localStorage.getItem("salt")==='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYWJsbGxsIjoiaGhoaGgifQ.YW5xOWv0c2kyAY_GU1M5XZmJehS5wOZcehZg2KIHs-A') {
        return true
    }

    this.router.navigate(['/home']);
    return false;
  };


}
