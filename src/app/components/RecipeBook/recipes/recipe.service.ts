import { Recipe } from "./recipe.model";

export class RecipeService{
    
    recipes: Recipe[] = [
        new Recipe(
          'Test Recipe', 
          'This is simply a test', 
          'https://m.media-amazon.com/images/I/61ign3tLtzL._AC_SX466_.jpg'
        ),
        new Recipe(
          'Test Recipe2',
          'This is simply a test2',
          'https://m.media-amazon.com/images/I/61tAdAiR0zL._AC_SX425_.jpg'
        )
    ];

    getRecipies(){
        return this.recipes.slice();
    }

};