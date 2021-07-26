import { Action, createReducer, on } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '@app/core/models/ingredient.model';

export interface SlState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: SlState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Potatoes', 12)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

const slReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, { ingredient }) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ingredient],
    };
  }),
  on(ShoppingListActions.addIngredients, (state, { ingredients }) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...ingredients],
    };
  }),
  on(ShoppingListActions.udpateIngredient, (state, { ingredient }) => {
    const editedIngredient = { ...state.ingredients[state.editedIngredientIndex], ...ingredient };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = editedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(ShoppingListActions.deleteIngredient, (state) => {
    const udpateIngredients = state.ingredients.filter((ig, igIndex) => {
      return igIndex !== state.editedIngredientIndex;
    });

    return {
      ...state,
      ingredients: udpateIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(ShoppingListActions.startEdit, (state, { index }) => {
    return {
      ...state,
      editedIngredientIndex: index,
      editedIngredient: { ...state.ingredients[index] },
    };
  }),
  on(ShoppingListActions.stopEdit, (state) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1
    }
  })
);

export function shoppingListReducer(state: SlState, action: Action) {
  return slReducer(state, action);
}
