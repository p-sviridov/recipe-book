import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './root-store/app.reducer';
import * as AuthActions from '@app/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
