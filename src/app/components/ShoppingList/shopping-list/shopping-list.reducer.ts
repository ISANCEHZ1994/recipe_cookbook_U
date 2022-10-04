// NOTE: the application will work as it already is however 
// in the case that the Angular application ever gets large and complex 
// we will need to use something to help mangage the state better

// our service - shopping-list.service.ts will be replaced with this file!
import { Ingredient } from "app/components/Shared/ingredient.model";

const initalState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
};

export function shoppingListReducer( state = initalState, action ){
    CASE: ''
    DEFAULT: ''
};

