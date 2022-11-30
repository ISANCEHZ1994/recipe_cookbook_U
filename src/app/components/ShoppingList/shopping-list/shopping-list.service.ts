// import { EventEmitter } from "@angular/core";
// Techincally we aren't even using this because we switched everything to NgRx
import { Subject } from "rxjs";
import { Ingredient } from "../../Shared/ingredient.model";

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

    getIngredient( index: number ){
        return this.ingredients[index];
    };

    addIngredient( ingredientOrWhateverNameYouWant: Ingredient ){
        this.ingredients.push(ingredientOrWhateverNameYouWant);
        // since we changed to subject: emit becomes next
        this.ingredientsChanged.next( this.ingredients.slice() );
    };

    addIngredients( ingredients: Ingredient[] ){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next( this.ingredients.slice() );
    };

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(  this.ingredients.slice() );
    };

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    };

};
