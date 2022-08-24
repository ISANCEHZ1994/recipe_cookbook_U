import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RecipesModule }    from './components/RecipeBook/recipes/recipes.module';
import { ShoppingListModule } from './components/ShoppingList/shopping-list/shopping-list.module';
import { SharedModule } from './components/Shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // MOVED AuthComponent => auth.module.ts
    // AuthComponent,
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
    // FormsModule moved to auth.module     
    AuthModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // TWO New Modules that were created to change what was inside of app-routing.modules
    RecipesModule,
    ShoppingListModule,
    // and now new module added
    SharedModule,
    CoreModule
  ], 
    // providers MOVED TO FILE => core.module.ts
    // ShoppingListService, 
    // RecipeService, 
    // { 
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: AuthInterceptorService,
    //   multi: true
    // }  
  bootstrap: [ AppComponent ],
  // to show error message in Auth Component HTML/TS
  // entryComponents: [
  //   AlertComponent
  // ]
})
export class AppModule {};
