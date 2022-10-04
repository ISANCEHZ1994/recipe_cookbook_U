// Modules In Short: 
// ** Angular analyzes NgModules to "understand" your application and its features (Angular doesn't automaticlly scan all files in your project)
// ** Angular Modules define all building blocks your app uses: Components, Directives, Services
// ** An app requires at least one module (AppModule) but may be split into muliptle Modules
// ** Core Angluar features are included in Angular Modules (e.g. FormsModule) to load them ONLY when needed
// ** You CANNOT use a feature/building block without including it in a module 

// Below had all components that were used in the app however we moved and changed the names to make better use of the module capabilities

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// now that we created both reducer and actions (store) for shopping-list we want to include it into our app
// StoreModule helps with setting up application-wide @ngrx/store
import { StoreModule } from '@ngrx/store'; 

import { RecipesModule }    from './components/RecipeBook/recipes/recipes.module';
import { ShoppingListModule } from './components/ShoppingList/shopping-list/shopping-list.module';
import { SharedModule } from './components/Shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { shoppingListReducer } from './components/ShoppingList/shopping-list/store/shopping-list.reducer';

@NgModule({
  // Declarations are an array of components, directives and pipes that you are using in the app
  declarations: [
    AppComponent,
    HeaderComponent,
    // MOVED AuthComponent          => auth.module.ts
    // RECIPE(S) ITEMS MOVED TO     => recipes.module.ts   
    // SHOPPING  ITEMS MOVED TO     => shopping-list.module.ts     
    // SHARED/BELOW ITEMS MOVED TO  => shared.module.ts
    // DropdownDirective,   
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective
  ],
  // ===> imports: allows you to import OTHER MODULES to split your app into multiple modules <===
  imports: [
    // We have modlues that ALREADY come with Angular
    BrowserModule,   
    HttpClientModule,
    // -- EVERYTHING ELSE BELOW IS CUSTOM MADE --
    AppRoutingModule,

    // we need to tell NgRx what makes up our store which reducers are involved - use forRoot()
    StoreModule.forRoot({// we will pass a so-called action reducer map
      // the key name (this case <shoppingList:> should be descriptive about which feature of the app this reducer belongs to )
      shoppingList: shoppingListReducer
    }),
    
     // FormsModule moved to auth.module along side with AuthComponent that used to be in declarations: 
    AuthModule,
    // TWO New Modules that were created to change what was inside of app-routing.modules
    RecipesModule,
    ShoppingListModule,
    // and now new module added
    SharedModule,
    CoreModule    
  ], 
  // ===> Providers are for all the SERVICES you want to provide <===
  // another way to attach something into the providers - view file data-storage.service.ts
    // providers MOVED TO FILE => core.module.ts
    // ShoppingListService, 
    // RecipeService, 
    // { 
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: AuthInterceptorService,
    //   multi: true
    // }  
  // ===> Bootstrap is important to start APP - it defines which component is available right in the index.html file <===
  bootstrap: [ AppComponent ],
  // ===> Entry Components is used for components you create in code - allows Angular to be aware of this component 
  // when it need to be create the component programmatically
  // in this case its to show error message in Auth Component HTML/TS

  // entryComponents: [
  //   AlertComponent
  // ]
})
export class AppModule {};
