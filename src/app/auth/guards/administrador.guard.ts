import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate {
  subscriptions: Subscription[] = [];
  user: User;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.authService.checkUser()

    ///si es loged
      const role_id = JSON.parse(localStorage.getItem('typeU'));
      if (role_id === 3) {
        console.log('Logged');
        return true;
      }else{
        // this.authService.errorSubject.next("El usuario no cuenta con los privilegios necesarios")
      }
      // return false
      // if(this.authService.currentUser.value)
    
    ///no logeado
    console.error('No logeado');

    this.router.navigate(['/auth/login']);
    return false;

  }



}
