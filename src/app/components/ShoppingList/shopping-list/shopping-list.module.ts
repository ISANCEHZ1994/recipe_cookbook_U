import { NgModule }     from "@angular/core";
import { FormsModule }  from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/components/Shared/shared.module";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

// we CAN do it this way but its a small route not a big list like recipes-routing.module
// const appRoutes: Routes = [
//     { path: 'shopping-list', component: ShoppingListComponent }
// ];

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent,
    ],
    imports: [        
        FormsModule,        
        RouterModule.forChild([
            // since we are using lazy loading path must be empty - the path is written in app-routing.module
            { path: '', component: ShoppingListComponent },
        ]), 
        SharedModule
     ],
     // No need for exports because that was only needed before when we had a separate routing module (recipes-module)
     // exports: [  ]
})
export class ShoppingListModule {};

// now that we are done creating this module - it should be added 
