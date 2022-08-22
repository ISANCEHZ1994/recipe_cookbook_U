import { NgModule }     from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListComponent }  from "./components/ShoppingList/shopping-list/shopping-list.component";
import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    // MOVED TO RECIPES-ROUTING.MODULE
    // { path: 'recipes', 
    //   canActivate: [AuthGuard], 
    //   component: RecipesComponent, 
    //   children: [
    //     { path: '',          component: RecipeStartComponent }, 
    //     { path: 'new',       component: RecipeEditComponent }, 
    //     { path: ':id',       component: RecipeDetailComponent, resolve: [ RecipesResolverService ] }, 
    //     { path: ':id/edit',  component: RecipeEditComponent } 
    // ]},    
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'auth',          component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

};