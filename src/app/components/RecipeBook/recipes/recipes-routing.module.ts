import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "app/auth/auth-guard";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesResolverService } from "./recipes-resolver.service";

const routes: Routes = [
    { path: '', 
      canActivate: [AuthGuard], 
      component: RecipesComponent, 
      children: [
        { path: '',          component: RecipeStartComponent }, 
        { path: 'new',       component: RecipeEditComponent }, 
        { path: ':id',       component: RecipeDetailComponent, resolve: [ RecipesResolverService ] }, 
        { path: ':id/edit',  component: RecipeEditComponent } 
    ]},
];

// with everything being done we are now going to add Lazy Loading - only load that specific component whenever the route is called
// uses less memory and makes the entire app faster in general - changing the 'recipes' path to => ''
// now we go to app-routing to really make Lazy Loading to work

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class RecipesRoutingModule {};
// now that this is done - we will use it in the newly created recipes.module - which is connected to the MAIN app.module