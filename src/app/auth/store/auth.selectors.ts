import { createSelector } from "@ngrx/store";

import { User } from "@app/core/models/user.model";
import { AuthState } from "./auth.reducer";
import { AppState } from "@app/root-store/app.reducer";

export const auth = (state: AppState): AuthState => state.auth;

export const authStateSelector = createSelector(
  auth,
  (state: AuthState): AuthState => state
);

export const userSelector = createSelector(
  auth,
  (state: AuthState): User => {
    return state.user;
  }
);
