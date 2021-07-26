import { createAction, props } from '@ngrx/store';

import { Ingredient } from '@app/core/models/ingredient.model';

const ADD_INGREDIENT = '[SL] ADD_INGREDIENT';
const ADD_INGREDIENTS = '[SL] ADD_INGREDIENTS';
const UPDATE_INGREDIENT = '[SL] UPDATE_INGREDIENT';
const DELETE_INGREDIENT = '[SL] DELETE_INGREDIENT';
const START_EDIT = '[SL] START_EDIT';
const STOP_EDIT = '[SL] STOP_EDIT';

export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{ ingredient: Ingredient }>()
);

export const addIngredients = createAction(
  ADD_INGREDIENTS,
  props<{ ingredients: Ingredient[] }>()
);

export const udpateIngredient = createAction(
  UPDATE_INGREDIENT,
  props<{ ingredient: Ingredient }>()
);

export const deleteIngredient = createAction(
  DELETE_INGREDIENT
);

export const startEdit = createAction(
  START_EDIT,
  props<{ index: number }>()
);

export const stopEdit = createAction(
  STOP_EDIT
);
