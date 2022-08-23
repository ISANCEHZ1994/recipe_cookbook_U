import { NgModule }     from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    // ======== [ MOVED TO RECIPES-ROUTING.MODULE ] ===========
    // { path: 'recipes', 
    //   canActivate: [AuthGuard], 
    //   component: RecipesComponent, 
    //   children: [
    //     { path: '',          component: RecipeStartComponent }, 
    //     { path: 'new',       component: RecipeEditComponent }, 
    //     { path: ':id',       component: RecipeDetailComponent, resolve: [ RecipesResolverService ] }, 
    //     { path: ':id/edit',  component: RecipeEditComponent } 
    // ]},    
    // =========== [ MOVED TO SHOPPING-LIST.MODULE ] ===========
    // { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'auth',          component: AuthComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

};