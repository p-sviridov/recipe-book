import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '@app/root-store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '@app/auth/store/auth.actions';
import * as RecipesActions from '@app/recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private store: Store<AppState>
  ) {}

  saveData() {
    this.store.dispatch(RecipesActions.storeRecipes());
  }

  fetchData() {
    this.store.dispatch(RecipesActions.fetchRecipes());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
