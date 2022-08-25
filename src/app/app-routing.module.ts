import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    // ===> We are now adding [ Lazy Loading ] here reference: https://angular.io/guide/lazy-loading-ngmodules <===
    { 
        path: 'recipes', 
        loadChildren: () => import( './components/RecipeBook/recipes/recipes.module' ).then( m => m.RecipesModule ) 
    },
    {
        path: 'shopping-list',
        loadChildren: () => import( './components/ShoppingList/shopping-list/shopping-list.module' ).then( m => m.ShoppingListModule )
    },
    {
        path: 'auth',
        loadChildren: () => import( './auth/auth.module' ).then( m => m.AuthModule )
    }
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
    // we would like to optomize Lazy Loading EVEN MORE - we can tell Angular to have lazy loaded modules PRELOADED
    imports: [ RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {};
