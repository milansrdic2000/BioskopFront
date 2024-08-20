import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { NotificationService } from '../notification.service';

@Injectable()
export class HttpResponseInterceptorService implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.notificationService.showHideModal.next(true);
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const body = event.body;
          const data = body.data;
          const modifiedBody = event.clone({ body: data });
          if (body.message && body.success) {
            this.notificationService.showNotification.next({
              type: 'success',
              message: data.message || 'Success',
            });
          } else if (body.message && !body.success) {
            this.notificationService.showNotification.next({
              type: 'error',
              message: data.message || 'Error',
            });
          }

          return modifiedBody;
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        this.notificationService.showNotification.next({
          type: 'error',
          message: error.error.message || 'An error occurred',
        });
        return throwError(error);
      }),
      finalize(() => {
        // console.log('Intercept end');
        this.notificationService.showHideModal.next(false);
      })
    );
  }
}
