import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";

// RESPONSE BODY PAYLOAD
// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
export interface AuthResponseData {
    kind:         string;
    idToken:      string;
    email:        string;
    refreshToken: string;
    expiresIn:    string;
    localId:      string;
    registered?:  boolean;
};

@Injectable({
    providedIn: "root"
})
export class AuthService {

    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null);
    token: string = null;
    private tokenExpirationTimer: any;

    constructor( private http: HttpClient, private router: Router ){};

    signup( email: string, password: string ){
        return this.http.post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuxuLQZ8qm3_sfITVpuJRCo7XVzqn9UGQ",
            {
                // REQUEST BODY PAYLOAD
                // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError( this.handleError ), tap( resData => {
                this.handleAuthentication( 
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                 );
            })
        );
    };

    login( email: string, password: string ){
        return this.http.post<AuthResponseData>(
            // NOTE: we were getting error because it was the wrong api => signInWithPassword
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuxuLQZ8qm3_sfITVpuJRCo7XVzqn9UGQ', 
            {
                email: email,
                password: password,
                returnSecureToken: true    
            }
        ).pipe(
            catchError( this.handleError ), tap( resData => {
                this.handleAuthentication( 
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                 );
            })
        );
    };

    autoLogin(){        
        const userData: {
            email:  string;
            id:     string;
            _token: string;
            _tokenExpirationDate: Date;
        } = JSON.parse( localStorage.getItem('userData') );
        
        if( !userData ){
            // if its false-ish - we can return
            return;
        };

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date( userData._tokenExpirationDate )
        );    
        
        if( loadedUser.token ){
            this.user.next( loadedUser );
            const expirationDate = new Date( userData._tokenExpirationDate ).getTime() - new Date().getTime();
            this.autoLogout( expirationDate );
        };
        // autoLogin done - should be placed where application lifecycle runs early - app.component.ts file!
    }; 

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if( this.tokenExpirationTimer ){
            clearTimeout( this.tokenExpirationTimer );
        };
    };

    autoLogout( expirationDate: number ){
        console.log( expirationDate );
        this.tokenExpirationTimer = setTimeout(() => {
             this.logout();
        }, expirationDate )
    };

    private handleAuthentication( 
        email:  string, 
        userId: string, 
        token:  string, 
        expiresIn: number 
    ){
        const expirationDate = new Date( new Date().getTime() + expiresIn * 1000 );
        // user needs to be stored inside of NgRx..check auth/store/auth.reducer.ts
        const user = new User( email, userId, token, expirationDate ); 
        this.user.next( user );
        this.autoLogout( expiresIn * 1000 );
        // now if even if we refresh or close tab- the user will still be signed in        
        localStorage.setItem('userData', JSON.stringify( user ));
        // now if we check the dev tools - application - local storage - we can now see user information inside!
    };

    private handleError( errorRes: HttpErrorResponse ){
        let errorMessage = 'AN UNKNOWN ERROR OCCURED';

        if( !errorRes.error || !errorRes.error.error ){
            return throwError( errorMessage );
        };

        switch ( errorRes.error.error.message ){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Incorrect Password Used!"
                break;
        };
        return throwError( errorMessage );
    };

};
