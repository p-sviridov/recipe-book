import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AppState } from '@app/root-store/app.reducer';
import { Ingredient } from '../models/ingredient.model';
import { createDBUrl } from '../utils';
import { userSelector } from '@app/auth/store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  getShoppingList(): Observable<Ingredient[]> {
    return this.store.pipe(
      select(userSelector),
      switchMap((user) => {
        const url = createDBUrl(`shopping-lists-by-userid/${user.id}`);
        return this.http.get<Ingredient[]>(url);
      }),
      map(ingredients => {
        const ingredientsArr = Object.keys(ingredients).map(key => {
          const ingredient = { ...ingredients[key], id: key };
          return ingredient
        });
        return ingredientsArr;
      })
    );
  }

  addShoppingItem(item: Ingredient) {
    return this.store.pipe(
      select(userSelector),
      switchMap((user) => {
        const url = createDBUrl(`shopping-lists-by-userid/${user.id}`);
        return this.http.post(url, item);
      }),
    );
  }

  updateItem(item: Ingredient, id: string) {
    return this.store.pipe(
      select(userSelector),
      switchMap((user) => {
        const url = createDBUrl(`shopping-lists-by-userid/${user.id}/${id}`);
        return this.http.put(url, item);
      }),
    );
  }

  deleteShoppingItem(itemId: string) {
    return this.store.pipe(
      select(userSelector),
      switchMap((user) => {
        const url = createDBUrl(`shopping-lists-by-userid/${user.id}/${itemId}`);
        return this.http.delete(url);
      }),
    );
  }
}
