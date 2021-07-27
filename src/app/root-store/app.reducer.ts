import * as fromShoppingList from '@app/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '@app/auth/store/auth.reducer';
import * as fromRecipes from '@app/recipes/store/recipes.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.SlState;
  auth: fromAuth.AuthState;
  recipes: fromRecipes.RecipesState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authenticationReducer,
  recipes: fromRecipes.recipesReducer
};
