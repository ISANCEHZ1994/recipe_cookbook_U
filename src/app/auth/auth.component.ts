import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor( private auth: AuthService ){}

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

        this.isLoading = true;
        if( this.isLoginMode ){

        } else {
          this.auth.signup( email, password ).subscribe( 
            resData => {
                console.log(resData);
                this.isLoading = false;
            }, errorMessage => {
                console.log(errorMessage);
                
                // switch( errorRes.error.error.message ){
                //     case 'EMAIL_EXISTS':
                //         this.error = 'this email ALREADY exists'
                // }
                // this.error = 'AN ERROR HAS OCCURED';
                
                this.error = errorMessage;
                this.isLoading = false;
            });  
        }; 
        form.reset();
    };

};