import { createAction, props } from '@ngrx/store';

import { Ingredient } from '@app/core/models/ingredient.model';

const LOAD_INGREDIENTS = '[SL] LOAD_INGREDIENTS';
const LOAD_INGREDIENTS_SUCCESS = '[SL] LOAD_INGREDIENTS_SUCCESS';
const LOAD_INGREDIENTS_FAILURE = '[SL] LOAD_INGREDIENTS_FAILURE';

const ADD_INGREDIENT = '[SL] ADD_INGREDIENT';
const ADD_INGREDIENT_SUCCESS = '[SL] ADD_INGREDIENT_SUCCESS';
const ADD_INGREDIENT_FAILURE = '[SL] ADD_INGREDIENT_FAILURE';

const ADD_INGREDIENTS = '[SL] ADD_INGREDIENTS';
const ADD_INGREDIENTS_SUCCESS = '[SL] ADD_INGREDIENTS_SUCCESS';
const ADD_INGREDIENTS_FAILURE = '[SL] ADD_INGREDIENTS_FAILURE';

const UPDATE_INGREDIENT = '[SL] UPDATE_INGREDIENT';
const UPDATE_INGREDIENT_SUCCESS = '[SL] UPDATE_INGREDIENT_SUCCESS';
const UPDATE_INGREDIENT_FAILURE = '[SL] UPDATE_INGREDIENT_FAILURE';

const DELETE_INGREDIENT = '[SL] DELETE_INGREDIENT';
const DELETE_INGREDIENT_SUCCESS = '[SL] DELETE_INGREDIENT_SUCCESS';
const DELETE_INGREDIENT_FAILURE = '[SL] DELETE_INGREDIENT_FAILURE';

const START_EDIT = '[SL] START_EDIT';
const STOP_EDIT = '[SL] STOP_EDIT';

// Loading
export const LoadIngredients = createAction(
  LOAD_INGREDIENTS
);

export const LoadIngredientsSuccess = createAction(
  LOAD_INGREDIENTS_SUCCESS,
  props<{ ingredients: Ingredient[] }>()
);

export const LoadIngredientsFailure = createAction(
  LOAD_INGREDIENTS_FAILURE,
  props<{ error: Error }>()
);

// Adding
export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{ ingredient: Ingredient}>()
);

export const addIngredientSuccess = createAction(
  ADD_INGREDIENT_SUCCESS,
  props<{ ingredient: Ingredient }>()
);

export const addIngredientFailure = createAction(
  ADD_INGREDIENT_FAILURE,
  props<{ error: Error }>()
);

// Updating
export const udpateIngredient = createAction(
  UPDATE_INGREDIENT,
  props<{ ingredient: Ingredient, id: string }>()
);

export const udpateIngredientSuccess = createAction(
  UPDATE_INGREDIENT_SUCCESS,
  props<{ ingredient: Ingredient, id: string }>()
);

export const udpateIngredientFailure = createAction(
  UPDATE_INGREDIENT_FAILURE,
  props<{ error: Error }>()
);

// Deleting
export const deleteIngredient = createAction(
  DELETE_INGREDIENT,
  props<{ id: string }>()
);

export const deleteIngredientSuccess = createAction(
  DELETE_INGREDIENT_SUCCESS,
  props<{ id: string }>()
);

export const deleteIngredientFailure = createAction(
  DELETE_INGREDIENT_FAILURE,
  props<{ error: Error }>()
);

// Editing
export const startEdit = createAction(
  START_EDIT,
  props<{ id: string }>()
);

export const stopEdit = createAction(
  STOP_EDIT
);
