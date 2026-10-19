// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Router } from "@angular/router";
// import { catchError, Observable, throwError } from "rxjs";

// @Injectable()
// export class CredentialInterceptor implements HttpInterceptor {
//     constructor(private router: Router) { }

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const authReq = req.clone({ withCredentials: true });
//         console.log(authReq, "CredentialInterceptor")
//         return next.handle(authReq).pipe(
//             catchError((error: HttpErrorResponse) => {
//                 if (error.status === 401) {
//                     this.router.navigate(['/auth']);
//                 }
//                 return throwError(() => error);
//             })
//         );
//     }
// }


import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class CredentialInterceptor implements HttpInterceptor {
  private readonly isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({ withCredentials: true });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.isBrowser) {
          void this.router.navigate(['/auth']);
        }

        return throwError(() => error);
      })
    );
  }
}
