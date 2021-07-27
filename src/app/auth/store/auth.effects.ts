import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';

import {
  AuthErrors,
  LoginResponseData,
  SignupResponseData,
} from '@app/core/models/auth.model';
import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';
import { User } from '@app/core/models/user.model';
import { AuthService } from '@app/core/services/auth.service';

const handleAuthentication = (
  resData: SignupResponseData | LoginResponseData
) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expirationDate
  );
  localStorage.setItem('userData', JSON.stringify(user));

  return AuthActions.authenticateSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate,
    redirect: true
  });
};

const handleError = (errorRes: any) => {
  const defaultErrorMessage = 'An unknown error occurred!';
  const errorType = errorRes.error.error.message;

  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticateFailed({ message: defaultErrorMessage }));
  }

  return of(AuthActions.authenticateFailed({ message: AuthErrors[errorType] }));
};

@Injectable()
export class AuthEffects {
  public authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(({ email, password }) => {
        return from(
          this.http.post<SignupResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              environment.firebaseAuthAPIKey,
            { email, password, returnSecureToken: true }
          )
        ).pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuthentication(resData);
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
      })
    )
  );

  public authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) => {
        return from(
          this.http.post<LoginResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebaseAuthAPIKey,
            { email, password, returnSecureToken: true }
          )
        ).pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuthentication(resData);
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
      })
    )
  );

  public authAutoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'dummy' };
        }

        const expDate = new Date(userData._tokenExpirationDate);

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          expDate
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return AuthActions.authenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: expDate,
            redirect: false
          });
        }

        return { type: 'dummy' };
      })
    )
  );

  public authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),
        tap((authSuccessAction) => {
          if (authSuccessAction.redirect) {
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  public authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          this.router.navigate(['/auth']);
          localStorage.removeItem('userData');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
