import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { RecipesComponent } from './components/RecipeBook/recipes/recipes.component';
import { RecipeListComponent } from './components/RecipeBook/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/RecipeBook/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './components/RecipeBook/recipes/recipe-detail/recipe-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingEditComponent } from './components/ShoppingList/shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './components/ShoppingList/shopping-list/shopping-list';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingEditComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
