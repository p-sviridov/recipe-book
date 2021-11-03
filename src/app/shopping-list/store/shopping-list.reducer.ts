import { Action, createReducer, on } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '@app/core/models/ingredient.model';

export interface SlState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientId: string;
  error: Error;
  loading: boolean;
}

const initialState: SlState = {
  ingredients: [],
  editedIngredient: null,
  editedIngredientId: '',
  error: undefined,
  loading: false
};

const slReducer = createReducer(
  initialState,

  // Loading
  on(ShoppingListActions.LoadIngredients, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(ShoppingListActions.LoadIngredientsSuccess, (state, { ingredients }) => {
    return {
      ...state,
      ingredients: [...ingredients],
      loading: false
    };
  }),

  on(ShoppingListActions.LoadIngredientsFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error
    };
  }),

  // Adding 
  on(ShoppingListActions.addIngredient, (state) => {
    return {
      ...state,
      loading: true
    };
  }),

  on(ShoppingListActions.addIngredientSuccess, (state, { ingredient }) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ingredient],
      loading: false
    };
  }),

  on(ShoppingListActions.addIngredientFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error
    };
  }),

  // Updating
  on(ShoppingListActions.udpateIngredient, (state) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(ShoppingListActions.udpateIngredientSuccess, (state, { ingredient, id }) => {
    const index = state.ingredients.findIndex((ing) => ing.id === id);
    const editedIngredient = { ...state.ingredients[index], ...ingredient };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[index] = editedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientId: '',
      loading: false
    };
  }),

  on(ShoppingListActions.udpateIngredientFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error
    }
  }),

  // Deleting
  on(ShoppingListActions.deleteIngredient, (state) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(ShoppingListActions.deleteIngredientSuccess, (state, { id }) => {
    const udpatedIngredients = state.ingredients.filter((ig) => {
      return ig.id !== id;
    });

    return {
      ...state,
      ingredients: udpatedIngredients,
      loading: false
    };
  }),

  on(ShoppingListActions.deleteIngredientFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error
    }
  }),

  // Editing
  on(ShoppingListActions.startEdit, (state, { id }) => {
    return {
      ...state,
      editedIngredientId: id,
      editedIngredient: state.ingredients.find((ing) => ing.id === id),
    };
  }),

  on(ShoppingListActions.stopEdit, (state) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientId: ''
    }
  })
);

export function shoppingListReducer(state: SlState, action: Action) {
  return slReducer(state, action);
}
