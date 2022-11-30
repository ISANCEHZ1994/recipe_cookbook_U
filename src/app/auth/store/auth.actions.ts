import { Action } from "@ngrx/store";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
    readonly type = LOGIN;
    // payload copied from user variable inside of auth.service.ts => handleAuthentication()
    constructor( 
        public payload: {
            email: string;
            userId: string;
            token: string;
            expirationDate: Date;
        } 
    ){}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

// shopping-list.actions file
export type AuthActions = Logout | Login;
