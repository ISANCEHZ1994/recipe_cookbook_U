import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/components/Shared/shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [
        AuthComponent
    ],   
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            // since we are using lazy loading path must be empty - the path is written in app-routing.module
            { path: '', component: AuthComponent }
        ]),
        SharedModule
    ]
})
export class AuthModule {};
