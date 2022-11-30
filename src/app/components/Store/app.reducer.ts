// this would be the ROOT store to combine all OTHER STORES
import * as fromShoppingList from '../ShoppingList/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
}
// think of below like how we have in app.module.ts where we have StoreModule.forRoot({})
export const addReducer: ActionReducerMap<AppState> = { 
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
 };
