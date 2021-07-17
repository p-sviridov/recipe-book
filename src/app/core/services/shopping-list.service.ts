import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Potatoes', 12),
  ];

  constructor() {}

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.updateList();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.updateList();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.updateList();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.updateList();
  }

  updateList() {
    this.ingredientsChanged.next(this.ingredients.slice());
    // check if ingredients duplicate
  }
}
