import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// RESPONSE BODY PAYLOAD
// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
interface AuthResponseData {
    // kind:         string;
    idToken:      string;
    email:        string;
    refreshToken: string;
    expiresIn:    string;
    localId:      string;
};

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor( private http: HttpClient ){};

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
            catchError( errorRes => {
                let errorMessage = 'AN UNKNOWN ERROR OCCURED';

                if( !errorRes.error || !errorRes.error.error ){
                    return throwError( errorMessage );
                };

                switch ( errorRes.error.error.message ){
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email exists already';
                };
                return throwError( errorMessage );
            })
        );
    };

};
