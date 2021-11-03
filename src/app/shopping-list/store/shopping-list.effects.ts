import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";

import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from "@app/core/models/ingredient.model";
import { ShoppingListService } from "@app/core/services/shopping-list.service";

@Injectable()
export class ShoppingListEffects {

  loadShoppingList = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.LoadIngredients),
      switchMap(() => this.slService.getShoppingList().pipe(
        map((ingredients: Ingredient[]) => ShoppingListActions.LoadIngredientsSuccess({ingredients})),
        catchError((error) => of(ShoppingListActions.LoadIngredientsFailure({ error })))
      )
    )
  ))

  addIngredient = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.addIngredient),
      mergeMap(({ ingredient }) =>
        this.slService.addShoppingItem(ingredient).pipe(
          map(() => ShoppingListActions.addIngredientSuccess({ ingredient })),
          catchError((error) => of(ShoppingListActions.addIngredientFailure({ error })))
        )
      )
    )
  )

  reloadList = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.addIngredientSuccess),
      map(() => ShoppingListActions.LoadIngredients())
    )
  )

  deleteIngredient = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.deleteIngredient),
      switchMap(({ id }) =>
        this.slService.deleteShoppingItem(id).pipe(
          map(() => ShoppingListActions.deleteIngredientSuccess({ id })),
          catchError((error) => of(ShoppingListActions.deleteIngredientFailure({ error })))
        )
      )
    )
  )

  updateIngredient = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingListActions.udpateIngredient),
      switchMap(({ ingredient, id }) =>
        this.slService.updateItem(ingredient, id).pipe(
          map(() => ShoppingListActions.udpateIngredientSuccess({ ingredient, id })),
          catchError((error) => of(ShoppingListActions.udpateIngredientFailure({ error })))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private slService: ShoppingListService
  ) {}
}