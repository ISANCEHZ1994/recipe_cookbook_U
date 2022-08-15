import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { RecipesComponent }      from './components/RecipeBook/recipes/recipes.component';
import { RecipeListComponent }   from './components/RecipeBook/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent }   from './components/RecipeBook/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeEditComponent }   from './components/RecipeBook/recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './components/RecipeBook/recipes/recipe-detail/recipe-detail.component';
import { ShoppingEditComponent } from './components/ShoppingList/shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './components/ShoppingList/shopping-list/shopping-list.component';
import { HeaderComponent }       from './components/header/header.component';
import { DropdownDirective }     from './components/Shared/dropdown.directive';
import { ShoppingListService }   from './components/ShoppingList/shopping-list/shopping-list.service';
import { RecipeStartComponent }  from './components/RecipeBook/recipes/recipe-start/recipe-start.component';
import { AppRoutingModule }      from './app-routing.module';
import { RecipeService } from './components/RecipeBook/recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingEditComponent,
    ShoppingListComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent, 
    AuthComponent   
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ ShoppingListService, RecipeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
