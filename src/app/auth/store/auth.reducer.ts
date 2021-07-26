import { Action, createReducer, on } from '@ngrx/store';

import { User } from '@app/core/models/user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { email, userId, token, expirationDate }) => {
    const user = new User(email, userId, token, expirationDate);
    return {
      ...state,
      user,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function authenticationReducer(state: AuthState, action: Action) {
  return authReducer(state, action);
}
