// import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";
import { Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertComponent } from "app/components/Shared/alert/alert.component";
import { PlaceholderDirective } from "app/components/Shared/placeholder/placeholder.directive";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild( PlaceholderDirective ) alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    constructor( 
        private auth: AuthService, 
        private router: Router, 
        private compoFactoryResolver: ComponentFactoryResolver 
    ){};

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
                this.showErrorAlert( errorMessage );
                this.isLoading = false;                                          
            }
        );

        form.reset();
    };

    onHandleError(){
        this.error = null;
    };

    private showErrorAlert( message: string ){
        // const alertCmp = new AlertComponent();
        const alertCmpFacotry = this.compoFactoryResolver.resolveComponentFactory( AlertComponent );
        const hostViewContianerRef = this.alertHost.viewContainerRef;
        // clear anything that might have been rendered there BEFORE
        hostViewContianerRef.clear();

        const componentRef = hostViewContianerRef.createComponent( alertCmpFacotry );

        // the message can now be seen HOWEVER the alert/error message cannot close
        // alert.component.ts => takes care of everything we already created for 
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(
            () => {
                this.closeSub.unsubscribe();
                hostViewContianerRef.clear();
            }
        );
    };

    ngOnDestroy(): void {
        if( this.closeSub ){
            this.closeSub.unsubscribe();
        }
    }

};