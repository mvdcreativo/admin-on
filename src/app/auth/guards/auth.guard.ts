import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean  {
      
      this.authService.checkUser()

      const role_id = JSON.parse(localStorage.getItem('typeU'));
      if (role_id === 1 || role_id === 3) {
        console.log('Logged');
        return true;
      }
      ///no logeado
      console.error('No logged');
      this.authService.errorSubject.next("El usuario no cuenta con los privilegios necesarios")
      
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
      
  }
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
