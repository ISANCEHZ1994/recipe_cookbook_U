import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

// import { ShoppingListService } from "./components/ShoppingList/shopping-list/shopping-list.service";
import { RecipeService } from "./components/RecipeBook/recipes/recipe.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

@NgModule({
    providers: [
        // Techincally we aren't even using this because we switched everything to NgRx
        // ShoppingListService, 
        RecipeService, 
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class CoreModule {};