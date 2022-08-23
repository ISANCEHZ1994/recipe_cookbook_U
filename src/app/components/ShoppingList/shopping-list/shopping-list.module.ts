import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

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
        // CommonModule: unlocked ngFor and ngIf
        CommonModule,
        RouterModule.forChild([
            { path: 'shopping-list', component: ShoppingListComponent }
        ])
     ],
     // No need for exports because that was only needed before when we had a separate routing module (recipes-module)
     // exports: [  ]
})
export class ShoppingListModule {};

// now that we are done creating this module - it should be added 
