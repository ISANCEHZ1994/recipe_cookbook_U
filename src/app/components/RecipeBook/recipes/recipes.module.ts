// learning about Modules specificlly Feature Modules
// essentially we are moving components from app.module.ts so that we can:
// know how a MODULE works - like the similariies between this file will have and the app.module.ts file 

// the components that are going to be moved here have all have something to do with recipe(s) - which is why it is also in this folder (DUH)

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component"; 
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesRoutingModule } from "./recipes-routing.module";

@NgModule({ 
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    // Think: How do we use this Recipes Module since its INSIDE of App Module?
    // to make this new Module work efficiently - we need to use EXPORTS
    // we export all components declared above so that we can not just use them in the recipes module but
    // in any module that imports the recipe module - which could be the App Module -> check app.module.ts in imports[] for recipes.module
    exports: [
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    // so if we check our router-outlet inside of recipes.component.html - there is an error 
    // the router only works for the app.module.ts so we must also use it inside of the imports
    imports: [
        RouterModule,
        // there were more erros appearing 
        ReactiveFormsModule,
        CommonModule,
        // we have moved everything that has to do with the recipes routes into this new file
        RecipesRoutingModule
    ]    
})
export class RecipesModule {

};
