import { createAction, props } from '@ngrx/store';

const LOGIN = '[Auth] LOGIN';
const LOGOUT = '[Auth] LOGOUT';

export const login = createAction(
  LOGIN,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);

export const logout = createAction(LOGOUT);
