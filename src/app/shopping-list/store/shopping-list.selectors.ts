import { createSelector } from "@ngrx/store";

import { SlState } from "./shopping-list.reducer";
import { AppState } from "@app/root-store/app.reducer";

export const auth = (state: AppState): SlState => state.shoppingList;

export const SlSelector = createSelector(
  auth,
  (state: SlState): SlState => state
);
