import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '@app/core/models/ingredient.model';
import * as ShoppingListActions from '@app/shopping-list/store/shopping-list.actions';
import { AppState } from '@app/root-store/app.reducer';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  shoppingList: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private store: Store<AppState>
  ) {}

  editItem(id: string) {
    this.store.dispatch(ShoppingListActions.startEdit({id}))
  }

  deleteItem(id: string) {
    this.store.dispatch(ShoppingListActions.deleteIngredient({id}))
  }

  async ngOnInit(): Promise<void> {
    this.store.dispatch(ShoppingListActions.LoadIngredients());
    this.shoppingList = this.store.select('shoppingList');
  }
}
