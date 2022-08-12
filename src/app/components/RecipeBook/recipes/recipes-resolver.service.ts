import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "app/components/Shared/data-storage.service";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";

import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
// Resolve <generic> interface used
export class RecipesResolverService implements Resolve<Recipe[]> { // again defining which type of data it will resolve    

    constructor( private dataSS: DataStorageService, private recipeService: RecipeService ){};

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ){
        const recipes = this.recipeService.getRecipes();

        if( RecipeListComponent.length === 0 ){
            return this.dataSS.fetchRecipes();
        } else {
            return recipes;
        }
        
    };
};