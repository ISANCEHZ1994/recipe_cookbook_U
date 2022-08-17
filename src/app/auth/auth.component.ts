import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor( private auth: AuthService, private router: Router ){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    };

    onSubmit( form: NgForm ){
        // console.log(form.value);
        if( !form.valid ){
            return; 
        };
        const email = form.value.email;
        const password = form.value.password;

        // we want to change into Observable and use this variable to do subscribe()
        let authObs: Observable<AuthResponseData>; 

        this.isLoading = true;

        if( this.isLoginMode ){
            // Login - view auth.service
            authObs = this.auth.login( email, password );// .subscribe(<MOVED>)
        } else {
            // Sign Up - view auth service
            authObs = this.auth.signup( email, password );// .subscribe(<MOVED>) 
        }; 

        // will be making all our subscribe calls instead of having everything inside of if-else
        // NOTE: when we refresh the page - login information is lost..
        authObs.subscribe(
            resData => {
                console.log( resData );
                this.isLoading = false;
                // after we login/sign up - we want to redirect to another page
                this.router.navigate(['/recipes']);
            }, errorMessage => {
                console.log( errorMessage );
                this.error = errorMessage;
                this.isLoading = false;                                          
            }
        );

        form.reset();
    };

};