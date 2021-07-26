import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '@app/core/models/ingredient.model';
import * as ShoppingListActions from '@app/shopping-list/store/shopping-list.actions';
import { AppState } from '@app/root-store/app.reducer';

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

  editItem(index: number) {
    this.store.dispatch(ShoppingListActions.startEdit({index}))
  }

  ngOnInit(): void {
    this.shoppingList = this.store.select('shoppingList');
  }
}
