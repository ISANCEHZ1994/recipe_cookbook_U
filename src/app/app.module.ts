import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecipeBookComponent } from './components/RecipeBook/recipe-book/recipe-book.component';
import { RecipeListComponent } from './components/RecipeBook/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/RecipeBook/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './components/RecipeBook/recipe-detail/recipe-detail.component';
import { RecipeComponent } from './components/RecipeBook/recipe/recipe.component';
import { ShoppingListEditComponent } from './components/ShoppingList/shopping-list-edit/shopping-list-edit.component';
import { IngredientComponent } from './components/ShoppingList/ingredient/ingredient.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeComponent,
    ShoppingListEditComponent,
    IngredientComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
