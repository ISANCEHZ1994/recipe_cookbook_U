import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../../Shared/ingredient.model";
import { ShoppingListService } from "../../ShoppingList/shopping-list/shopping-list.service";
import * as ShoppingListActions from "../../ShoppingList/shopping-list/store/shopping-list.actions"

@Injectable()
export class RecipeService {

    recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();
    
    // IN CASE: For dummy data
    // recipes: Recipe[] = [
    //     new Recipe(
    //       'Test Recipe', 
    //       'This is simply a test', 
    //       'https://m.media-amazon.com/images/I/61ign3tLtzL._AC_SX466_.jpg',
    //       [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('French Fries', 20)
    //       ]
    //     ),
    //     new Recipe(
    //       'Test Recipe2',
    //       'This is simply a test2',
    //       'https://m.media-amazon.com/images/I/61tAdAiR0zL._AC_SX425_.jpg',
    //       [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 100)
    //       ]
    //     )
    // ];
    
    private recipes: Recipe[] = [];

    constructor( 
      private slService: ShoppingListService,
      // have to clear about what is inside the store - type definition should be same as 
      // notes about what the <> brakets are doing are inside of shopping-list.component
      private store: Store<{shoppingList: { ingredients: Ingredient[] }}> 
    ){};

    setRecipes( recipes: Recipe[] ){
      this.recipes = recipes;
      this.recipesChanged.next( this.recipes.slice() );
    };

    getRecipes(){
        return this.recipes.slice();
    };

    getRecipe( index: number ){
        return this.recipes[index];
    };

    // now we are using NgRx store - so instead of using slService (the shopping-list.service.ts) 
    // should DISPATCH add ingredient actions
    addIngredientsToShoppingList( ingredients: Ingredient[] ){
        // this.slService.addIngredients( ingredients );
        this.store.dispatch(
          new ShoppingListActions.AddIngredients(ingredients)
        );
    };

    addRecipe( recipe: Recipe ){
      this.recipes.push( recipe );
      this.recipesChanged.next( this.recipes.slice() );
    };

    updateRecipe( index: number, newRecipe: Recipe ){
      this.recipes[index] = newRecipe;
      this.recipesChanged.next( this.recipes.slice() );
    };

    deleteRecipe( index: number ){
      this.recipes.splice( index, 1 );
      this.recipesChanged.next( this.recipes.slice() ); // enit a copy of the updated recipes
    };

};