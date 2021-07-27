import { createAction, props } from '@ngrx/store';

import { Recipe } from '@app/core/models/recipe.model';

const SET_RECIPES = '[Recipes] SET_RECIPES';
const FETCH_RECIPES = '[Recipes] FETCH_RECIPES';
const ADD_RECIPE = '[Recipes] ADD_RECIPE';
const UPDATE_RECIPE = '[Recipes] UPDATE_RECIPE';
const DELETE_RECIPE = '[Recipes] DELETE_RECIPE';
const STORE_RECIPES = '[Recipes] STORE_RECIPES';

export const setRecipes = createAction(
  SET_RECIPES,
  props<{ recipes: Recipe[] }>()
);

export const addRecipe = createAction(
  ADD_RECIPE,
  props<{ recipe: Recipe }>()
);

export const updateRecipe = createAction(
  UPDATE_RECIPE,
  props<{ index: number, newRecipe: Recipe }>()
);
export const deleteRecipe = createAction(
  DELETE_RECIPE,
  props<{ index: number }>()
);

export const fetchRecipes = createAction(
  FETCH_RECIPES
);

export const storeRecipes = createAction(
  STORE_RECIPES
);


