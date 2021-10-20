import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { RecipeListComponent } from './components/RecipeBook/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/RecipeBook/recipes/recipe-list/recipe-item/recipe-item.component';

import { IngredientComponent } from './components/ShoppingList/ingredient/ingredient.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingEditComponent } from './components/ShoppingList/shopping-list/shopping-edit/shopping-edit.component';
import { RecipesComponent } from './components/RecipeBook/recipes/recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeItemComponent,
    IngredientComponent,
    HeaderComponent,
    ShoppingEditComponent,
    RecipesComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
