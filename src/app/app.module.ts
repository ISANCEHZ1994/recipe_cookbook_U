import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent }     from './components/header/header.component';
import { ShoppingListService } from './components/ShoppingList/shopping-list/shopping-list.service';
import { AppRoutingModule }    from './app-routing.module';
import { RecipeService } from './components/RecipeBook/recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipesModule } from './components/RecipeBook/recipes/recipes.module';
import { ShoppingListModule } from './components/ShoppingList/shopping-list/shopping-list.module';
import { SharedModule } from './components/Shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    // RECIPE(S) ITEMS MOVED TO => recipes.module.ts   
    // SHOPPING  ITEMS MOVED TO => shopping-list.module.ts     
    // SHARED ITEMS MOVED TO => shared.module.ts
    // DropdownDirective,   
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // TWO New Modules that were created to change what was inside of app-routing.modules
    RecipesModule,
    ShoppingListModule,
    // and now new module added
    SharedModule
  ],
  providers: [ 
    ShoppingListService, 
    RecipeService, 
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ],
  // to show error message in Auth Component HTML/TS
  // entryComponents: [
  //   AlertComponent
  // ]
})
export class AppModule { }
