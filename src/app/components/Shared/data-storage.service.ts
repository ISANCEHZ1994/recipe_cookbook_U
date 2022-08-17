import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { Recipe } from "../RecipeBook/recipes/recipe.model";
import { RecipeService } from "../RecipeBook/recipes/recipe.service";
import { Ingredient } from "./ingredient.model";
import { AuthService } from "app/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor( 
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService 
    ){};

    storeRecipes() {
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
        // if you see inside of auth.service - BehaviorSubject is now being used so we changed/use different functions to 
        return this.authService.user.pipe(
            take( 1 ), 
            exhaustMap(
                // adding auth for THAT specifc user
                user => {
                    return this.http
                    .get<Recipe[]>('https://ng-course-recipe-book-e39b2-default-rtdb.firebaseio.com/recipes.json',
                        {
                           params: new HttpParams().set( 'auth', user.token )
                        }
                    );
                }
            // first map from rxjs/operator
            ), map( recipes => {
                return recipes.map( recipe => {
                    return { 
                        ...recipe, 
                        ingredients: recipe.ingredients ? recipe.ingredients : [] 
                    }
                });
            }),
            tap( recipes => {
                this.recipeService.setRecipes( recipes );
            })
        );
        // PREVIOUS CODE BELOW!
    };

};

    // fetchRecipes(){
        // since we are now returning something ==> .subscribe() is not needed HERE! 
        // look into header.component.ts file ==> .onFetchData() function
        // return this.http
        //     .get<Recipe[]>(
        //         'https://ng-course-recipe-book-e39b2-default-rtdb.firebaseio.com/recipes.json'
        //     )
        //     .pipe(
        //         // first map from rxjs/operator
        //         map( recipes => {
        //             return recipes.map( recipe => {
        //                 return { 
        //                     ...recipe, 
        //                     ingredients: recipe.ingredients ? recipe.ingredients : [] 
        //                 }
        //             });
        //         }),
        //         tap( recipes => {
        //             this.recipeService.setRecipes( recipes );
        //         })
        //     )
        //     .subscribe( recipes => {
        //         console.log(recipes);

        // MOVED to tap() above
        // this.recipeService.setRecipes( recipes ); // recipes - did not work because Angular/TypeScript needs to know the specific datatype passing thru
        // });
 // }