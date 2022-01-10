import { createSelector } from "@ngrx/store";

import { RecipesState } from "./recipes.reducer";
import { AppState } from "@app/root-store/app.reducer";

export const auth = (state: AppState): RecipesState => state.recipes;

export const recipesSelector = createSelector(
  auth,
  (state: RecipesState): RecipesState => state
);
