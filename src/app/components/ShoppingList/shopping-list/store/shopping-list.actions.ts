// again this is just to show how to use NgRx - could work as is with just a service file
import { Action } from '@ngrx/store';
import { Ingredient } from '../../../Shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";


// implements the action which is an INTERFACE not itself an object
export class AddIngredient implements Action {
    // readonly is a TypeScript feature meaning it must never be changed from outside
    // enhances type safety and ensures that we don't mess with our pattern    
    readonly type = ADD_INGREDIENT;
    // the action needs more that JUST a type - we need this action to do something else!
    // payload: Ingredient;

    constructor( public payload: Ingredient ){};
};

// now if we want to do multiple actions
export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor( public payload: Ingredient[] ){};
};

// so that we can export both actions and not ONE specific - so that we can use Multiple Actions
// also speificlly using TypeScript feature basically saying what the type of action(s) that ShoppingListActions are
export type ShoppingListActions = AddIngredient | AddIngredients;
// should also be changed in other places as well such as the reducer