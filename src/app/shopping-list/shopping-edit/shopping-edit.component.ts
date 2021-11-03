import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as ShoppingListActions from '../store/shopping-list.actions';
import { Ingredient } from '@app/core/models/ingredient.model';
import { AppState } from '@app/root-store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<AppState>
  ) {}

  submitItem(form: NgForm) {
    const value = form.value;
    const newIngredient = { name: value.name, amount: value.amount };
    if (this.editMode) {
      this.store.dispatch(
        ShoppingListActions.udpateIngredient({
          ingredient: newIngredient,
          id: this.editedItem.id
        })
      );
    } else {
      this.store.dispatch(
        ShoppingListActions.addIngredient({ ingredient: newIngredient })
      );
    }

    this.clearForm();
  }

  clearForm() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientId) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slForm?.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.stopEdit());
  }
}
