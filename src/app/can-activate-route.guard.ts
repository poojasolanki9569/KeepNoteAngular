import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(
    public authService: AuthenticationService,
    public routerService: RouterService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const auth = this.authService.isUserAuthenticated(this.authService.getBearerToken());
      return auth.then((authenticated) => {
        if (!authenticated) {
          this.routerService.routeToLogin();
        }
        return authenticated;
      });
  }
}
