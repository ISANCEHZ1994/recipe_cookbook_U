// since we are now swtiching NgRx 
// rememnber that we are not using the original auth.service anymore..
import { User } from "../user.model";
// import { AuthActions } from "./auth.actions";
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
}

const initalState = {
    user: null,
};

export function authReducer( state = initalState, action: AuthActions.AuthActions ){
    switch( action.type ){
        case AuthActions.LOGIN:
            const newUser = new User(
                action.payload.email, 
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate                  
            );
            return {
                ...state,
                user: newUser                
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
    // return state;
};