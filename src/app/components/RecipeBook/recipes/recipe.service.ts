import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "app/components/Shared/ingredient.model";
import { ShoppingListService } from "app/components/ShoppingList/shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();
    
    recipes: Recipe[] = [
        new Recipe(
          'Test Recipe', 
          'This is simply a test', 
          'https://m.media-amazon.com/images/I/61ign3tLtzL._AC_SX466_.jpg',
          [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
          ]
        ),
        new Recipe(
          'Test Recipe2',
          'This is simply a test2',
          'https://m.media-amazon.com/images/I/61tAdAiR0zL._AC_SX425_.jpg',
          [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 100)
          ]
        )
    ];

    constructor( private slService: ShoppingListService ){};

    getRecipies(){
        return this.recipes.slice();
    };

    getRecipe( index: number ){
        return this.recipes[index];
    };

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    };

}