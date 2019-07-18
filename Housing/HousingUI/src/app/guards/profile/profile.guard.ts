import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { map } from 'rxjs/operators';
import { truncate } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  isAuth: any;
  isAuthFromRefresh: any;

  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.getInitialUser().pipe(map(user => {
      console.log('guards user object from refresh is' + user);
      this.isAuthFromRefresh = !!user.user;
      this.userService.getUserUpdateListener().subscribe(userFromUpdateListener => {
        console.log('guards user object is' + user);
        this.isAuth = !!userFromUpdateListener;
      });
      if (this.isAuth || this.isAuthFromRefresh) {
        return true;
      }
      console.log('this.isAuth is' + this.isAuth);
      console.log('this.isAuthfromRefresh is ' + this.isAuthFromRefresh);
      return this.router.createUrlTree(['login']);
      }));
    }
}
