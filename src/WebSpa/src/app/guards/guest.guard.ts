import { CanActivate, Router } from "@angular/router";
import { map, Observable } from "rxjs";

import { Injectable } from "@angular/core";
import { AuthService } from "../auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map(loggedIn => {
        if (loggedIn) {
          this.router.navigate(['/cardio-trust']);
          return false;
        }
        return true;
      })
    );
  }
}
