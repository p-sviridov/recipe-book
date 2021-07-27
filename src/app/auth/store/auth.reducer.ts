import { Action, createReducer, on } from '@ngrx/store';

import { User } from '@app/core/models/user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => {
    return {
      ...state,
      authError: null,
      loading: true
    }
  }),
  on(AuthActions.signup, (state) => {
    return {
      ...state,
      authError: null,
      loading: true
    }
  }),
  on(AuthActions.authenticateSuccess, (state, { email, userId, token, expirationDate }) => {
    const user = new User(email, userId, token, expirationDate);
    return {
      ...state,
      user,
      loading: false,
      authError: null
    };
  }),
  on(AuthActions.authenticateFailed, (state, { message }) => {
    return {
      ...state,
      user: null,
      authError: message,
      loading: false
    }
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
