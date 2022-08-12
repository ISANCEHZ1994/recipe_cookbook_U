import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "app/components/Shared/data-storage.service";

import { Recipe } from "./recipe.model";

@Injectable({
    providedIn: 'root'
})
// Resolve <generic> interface used
export class RecipesResolverService implements Resolve<Recipe[]> { // again defining which type of data it will resolve

    constructor( private dataSS: DataStorageService ){};

    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ){
        return this.dataSS.fetchRecipes();
    };
};