// since we are now swtiching NgRx 
// rememnber that we are not using the original auth.service anymore..
import { User } from "../user.model";

export interface State {
    user: User;
}

const initalState = {
    user: null,
};

export function authReducer( state = initalState, action ){
    return state;
};