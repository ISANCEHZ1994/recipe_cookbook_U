// NOTE: the application will work as it already is however 
// in the case that the Angular application ever gets large and complex 
// we will need to use something to help mangage the state better

// our service - shopping-list.service.ts will be replaced with this file!
import { Ingredient } from '../../../Shared/ingredient.model';
import { ADD_INGREDIENT } from "./shopping-list.actions";
import { ADD_INGREDIENTS } from "./shopping-list.actions";
import { UPDATE_INGREDIENT } from './shopping-list.actions';
import { DELETED_INGREDIENT } from './shopping-list.actions';
// import { AddIngredient } from "./shopping-list.actions";

import * as ShoppingListActions from './shopping-list.actions';
// import { StateObservable } from '@ngrx/store';

// with this interface - now we can go to other places where we used store and reference the AppState
export interface AppState {    
    shoppingList: State;
};

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: Number
};
// we are now telling our state to be of type INTERFACE STATE above!
const initalState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    // NOTE: since we are changing the state object - we must ensure that everything else has the same change where we IMPORT STATE..
    // seems annoying to change everything tho so instead we'll create an interface above so that state is easier to manage everywhere else
    editedIngredient: null, // null will represent the type INGREIDENT - state doesnt accept TYPES so null instead
    editedIngredientIndex: -1 // -1 will represent the type NUMBER - state doesnt accept TYPES so negative 1 instead
    // its -1 because if we make it 0 - it will think we mean the 0 index
};

export function shoppingListReducer( 
    state = initalState, 
    // AddIngredient - is only specific to that action so we must change to use multiple actions - go to shopping-list.action file
    action: ShoppingListActions.ShoppingListActions
){

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
        case ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    // check payload - we dont want a NESTED array hence the ...action.payload
                    ...action.payload
                ]
            };
        case UPDATE_INGREDIENT:
            // below is to ENFORCE immutable logic - looks crazy but will prevent unexpected bugs 

            // we want to get the specific ingreident that we want to change => [] accesses the index which is part of the payload
            const ingredient = state.ingredients[action.payload.index];
            // create a copy of the old ingredient and action.payload also has the ingredient
            const updatedIngredient = {
                // copying old properties
                ...ingredient,
                // adding new properties
                ...action.payload.ingredient
            };
            // we need an array of old ingredients - techincally it will be a new array with the old data
            const updatedIngredients = [...state.ingredients];
            // overriding the exisitng element with the new one - NOTICE: using updatedIngredient variable
            updatedIngredients[action.payload.index] = updatedIngredient;
            // now updatedIngredients is an array of ingreidients where we edited an ingreident
            return {
                ...state,
                ingredients: updatedIngredients
            };
        case DELETED_INGREDIENT: 
            return {
                // again copy of the old state
                ...state,
                // REMEMBER: filter will always return a new array!
                
                ingredients: state.ingredients.filter( ( ing, ingIndex ) => {
                    return ingIndex !== action.payload;
                })
            };
        default:
            return state;
    }
   
};

