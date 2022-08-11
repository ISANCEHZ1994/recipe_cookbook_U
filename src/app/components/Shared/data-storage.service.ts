import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../RecipeBook/recipes/recipe.model";
import { RecipeService } from "../RecipeBook/recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor( 
        private http: HttpClient,
        private recipeService: RecipeService 
    ){};

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http
            .put(
                'https://ng-course-recipe-book-e39b2-default-rtdb.firebaseio.com/recipes.json', 
                recipes
            )
            .subscribe( response => {
                console.log(response);
            });
    };

    fetchRecipes(){
        this.http
            .get(
                'https://ng-course-recipe-book-e39b2-default-rtdb.firebaseio.com/recipes.json'
            )
            .subscribe( recipes => {
                console.log(recipes);
            });
    };

};