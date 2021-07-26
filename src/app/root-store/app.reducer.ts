import * as fromShoppingList from '@app/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '@app/auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.SlState;
  auth: fromAuth.AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authenticationReducer
};
