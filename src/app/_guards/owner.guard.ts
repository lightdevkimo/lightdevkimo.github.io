import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators'
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {

  }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //
    if (localStorage.getItem("salt")==='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJieWVieWUiOiJieWVieWUifQ.EO2FQLVSrgS74bZHch0kxu-HzUK56osW8BdT7WShyoU') {
        return true
    }

    this.router.navigate(['/home']);
    return false;
  };


}
