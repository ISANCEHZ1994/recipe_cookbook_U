// import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "app/components/Shared/ingredient.model";

export class ShoppingListService{
    // we are replacing EventEmitter with Subject
    // ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    
    private ingredients: Ingredient[] = [
       new Ingredient('Apples', 5),
       new Ingredient('Tomatoes', 10)
    ]; 
    
    getIngredients(){
        return this.ingredients.slice();
    };

    getIngredient(index: number){
        return this.ingredients[index];
    };

    addingIngredient(ingredientOrWhateverNameYouWant: Ingredient){
        this.ingredients.push(ingredientOrWhateverNameYouWant);
        // since we changed to subject: emit becomes next
        this.ingredientsChanged.next(this.ingredients.slice());
    };

    addIngredients( ingredients: Ingredient[] ){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

};
