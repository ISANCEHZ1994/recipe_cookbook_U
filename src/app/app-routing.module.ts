import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { RecipesComponent } from "./components/RecipeBook/recipes/recipes.component";
import { ShoppingListComponent } from "./components/ShoppingList/shopping-list/shopping-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes',          component: RecipesComponent },
    { path: 'shopping-list',    component: ShoppingListComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

};