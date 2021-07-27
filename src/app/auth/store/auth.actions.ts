import { createAction, props } from '@ngrx/store';

const LOGIN = '[Auth] LOGIN';
const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE_SUCCESS';
const AUTHENTICATE_FAILED = '[Auth] AUTHENTICATE_FAILED';
const LOGOUT = '[Auth] LOGOUT';
const SIGNUP = '[Auth] SIGNUP';
const AUTO_LOGIN = '[Auth] AUTO_LOGIN'

export const login = createAction(
  LOGIN,
  props<{
    email: string;
    password: string;
  }>()
);

export const signup = createAction(
  SIGNUP,
  props<{
    email: string;
    password: string;
  }>()
)

export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);

export const authenticateFailed = createAction(
  AUTHENTICATE_FAILED,
  props<{
    message: string
  }>()
);

export const autoLogin = createAction(
  AUTO_LOGIN
)

export const logout = createAction(LOGOUT);
