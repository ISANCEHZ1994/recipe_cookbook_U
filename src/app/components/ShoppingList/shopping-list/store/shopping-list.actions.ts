// again this is just to show how to use NgRx - could work as is with just a service file
import { Action } from '@ngrx/store';
import { Ingredient } from 'app/components/Shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

// implements the action which is an INTERFACE not itself an object
export class AddIngredient implements Action {
    // readonly is a TypeScript feature meaning it must never be changed from outside
    // enhances type safety and ensures that we don't mess with our pattern    
    readonly type = ADD_INGREDIENT;
    // the action needs more that JUST a type - we need this action to do something else!
    payload: Ingredient;
};
