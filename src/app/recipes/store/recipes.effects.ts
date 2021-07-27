import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { Recipe } from '@app/core/models/recipe.model';
import * as RecipesActions from './recipes.actions';
import { AppState } from '@app/root-store/app.reducer';

@Injectable()
export class RecipesEffects {
  public fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(environment.firebaseDatabaseURL);
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return RecipesActions.setRecipes({ recipes });
      })
    )
  );

  public storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.storeRecipes),
        switchMap((action) => {
          return this.store.pipe(
            select('recipes'),
            map((recipesState) => {
              return this.http
                .put(environment.firebaseDatabaseURL, recipesState.recipes)
                .subscribe();
            })
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
}
