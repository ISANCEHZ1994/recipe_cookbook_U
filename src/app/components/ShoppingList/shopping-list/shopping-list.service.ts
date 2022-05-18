
import { EventEmitter } from "@angular/core";
import { Ingredient } from "app/components/Shared/ingredient.model";


export class ShoppingListService{

    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
       new Ingredient('Apples', 5),
       new Ingredient('Tomatoes', 10)
    ]; 
    
    getIngredients(){
        return this.ingredients.slice();
    };

    addingIngredient(ingredientOrWhateverNameYouWant: Ingredient){
        this.ingredients.push(ingredientOrWhateverNameYouWant);
        this.ingredientsChanged.emit(this.ingredients.slice());
    };

    addIngredients( ingredients: Ingredient[] ){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

};
