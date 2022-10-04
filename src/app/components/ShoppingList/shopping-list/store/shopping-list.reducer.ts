// NOTE: the application will work as it already is however 
// in the case that the Angular application ever gets large and complex 
// we will need to use something to help mangage the state better

// our service - shopping-list.service.ts will be replaced with this file!
import { Action } from "@ngrx/store"; // no longer need
import { Ingredient } from "app/components/Shared/ingredient.model";
import { ADD_INGREDIENT } from "./shopping-list.actions";
import { AddIngredient } from "./shopping-list.actions";

const initalState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
};

export function shoppingListReducer( state = initalState, action: AddIngredient ){

    // possibly for later! 
    // const { type, payload } = action;

    switch( action.type ){
        case ADD_INGREDIENT: 
            // below would be completely WRONG! state changes with NgRx always have to be IMMUTABLE
            // meaning we can not edit the existing or previous state
            // ===> return state.ingreidents.push()
            // INSTEAD return a new object to replace the state
            // COPY the old state with spread operator (like in REDUX)
            return {
                ...state, // techinally you don't have to add it because there is only one item in the state but REALLY good practice!
                ingredients: [ // remember - the item we are changing is the ingredients array
                    ...state.ingredients,
                    action.payload  
                ]
            };
        default:
            return state;
    }
   
};

