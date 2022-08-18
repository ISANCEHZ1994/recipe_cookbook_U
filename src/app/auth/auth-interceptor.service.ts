import { 
    HttpEvent, 
    HttpHandler, 
    HttpInterceptor, 
    HttpParams, 
    HttpRequest 
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor( private authService: AuthService ){};

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // ------ this part was taken from data-storage.service.ts file to do work here!
        return this.authService.user.pipe(
            take(1),
            exhaustMap( user => {
        // ------ part of copied code ends here

                // checking for the variable(user) inside of auth.service.ts 
                if( !user ){
                    return next.handle( req );
                }; 
                const modifiedReq = req.clone({
                    params: new HttpParams().set( 'auth', user.token )
                });
                return next.handle( modifiedReq );
            })
        );
       
    };
};