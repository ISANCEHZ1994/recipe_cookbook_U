import { NgModule }     from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// C:\Users\isanchez\Desktop\Practice\AngularWork\cookbook-shoppinglist\src\app\components\RecipeBook\recipes\recipes.module.ts

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    // ===> We are now adding Lazy Loading here <===
    { 
        path: 'recipes', 
        loadChildren: () => import( './components/RecipeBook/recipes/recipes.module' ).then( m => m.RecipesModule ) 
    },
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
    // =========== [ MOVED TO AUTH.MODULE.TS ] ==================
    // { path: 'auth',          component: AuthComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {};