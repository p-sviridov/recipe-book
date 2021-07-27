import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '@app/root-store/app.reducer';
import * as AuthActions from '@app/auth/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  private storeSub: Subscription;

  constructor(
    private store: Store<AppState>
  ) {}

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  sumbit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.errorMessage = '';

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.store.dispatch(AuthActions.login({ email, password }));
    } else {
      this.store.dispatch(AuthActions.signup({ email, password }));
    }

    form.reset();
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.errorMessage = authState.authError;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
