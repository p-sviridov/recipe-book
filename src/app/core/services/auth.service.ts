import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/root-store/app.reducer';
import * as AuthActions from '@app/auth/store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenTimer: any;

  constructor(private store: Store<AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
      this.tokenTimer = null;
    }
  }
}
