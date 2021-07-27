import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

import { AppState } from '@app/root-store/app.reducer';
import * as RecipesActions from '@app/recipes/store/recipes.actions';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<any> {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(RecipesActions.fetchRecipes());
    return this.actions$.pipe(ofType(RecipesActions.setRecipes), take(1));
  }
}
