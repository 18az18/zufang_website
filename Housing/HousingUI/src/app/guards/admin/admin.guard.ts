import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isAuth: any;
  isAuthFromRefresh: any;
  updateListenerUser: any;

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
        this.updateListenerUser = userFromUpdateListener;
      });
      if (this.isAuthFromRefresh) {
        if (user.user.role === 'admin') {
          return true;
        }
      }
      if (this.isAuth) {
        if (this.updateListenerUser.role === 'admin') {
          return true;
        }
      }
      console.log('this.isAuth from admin access is' + this.isAuth);
      console.log('this.isAuthfromRefresh from admin access is ' + this.isAuthFromRefresh);
      console.log('this.updatelisteneruser from admin access is' + this.updateListenerUser);
      return this.router.createUrlTree(['']);
      }));
    }
}
