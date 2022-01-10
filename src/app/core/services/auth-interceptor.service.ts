import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { exhaustMap, map, take } from 'rxjs/operators';

import { AppState } from '@app/root-store/app.reducer';
import { userSelector } from '@app/auth/store/auth.selectors';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.store.pipe(
      select(userSelector),
      take(1),
      exhaustMap((user) => {
        if(!user) {
          return next.handle(request)
        }

        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
