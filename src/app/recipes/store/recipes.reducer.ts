import { Action, createReducer, on } from '@ngrx/store';

import { Recipe } from '@app/core/models/recipe.model';
import * as RecipesActions from './recipes.actions';

export interface RecipesState {
  recipes: Recipe[];
}

const initialState: RecipesState = {
  recipes: [],
};

const recRecuder = createReducer(
  initialState,
  on(RecipesActions.setRecipes, (state, { recipes }) => {
    return {
      ...state,
      recipes: [...recipes],
    };
  }),
  on(RecipesActions.addRecipe, (state, { recipe }) => {
    return {
      ...state,
      recipes: [...state.recipes, recipe],
    };
  }),
  on(RecipesActions.updateRecipe, (state, { index, newRecipe }) => {
    const updatedRecipe = { ...state.recipes[index], ...newRecipe };
    const updatedRecipes = [...state.recipes];
    updatedRecipes[index] = updatedRecipe;

    return {
      ...state,
      recipes: updatedRecipes,
    };
  }),
  on(RecipesActions.deleteRecipe, (state, { index }) => {
    return {
      ...state,
      recipes: state.recipes.filter((recipe, recipeIndex) => {
        return recipeIndex !== index;
      }),
    };
  })
);

export function recipesReducer(state: RecipesState, action: Action) {
  return recRecuder(state, action);
}
