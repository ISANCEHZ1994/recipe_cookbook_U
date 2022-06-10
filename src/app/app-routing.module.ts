import { NgModule }     from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent }    from "./components/RecipeBook/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent }      from "./components/RecipeBook/recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent }     from "./components/RecipeBook/recipes/recipe-start/recipe-start.component";
import { RecipesComponent }         from "./components/RecipeBook/recipes/recipes.component";
import { ShoppingListComponent }    from "./components/ShoppingList/shopping-list/shopping-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes',       component: RecipesComponent, children: [
        { path: '',          component: RecipeStartComponent }, 
        { path: 'new',       component: RecipeEditComponent }, 
        { path: ':id',       component: RecipeDetailComponent }, 
        { path: ':id/edit',  component: RecipeEditComponent } 
    ]},
    { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

};