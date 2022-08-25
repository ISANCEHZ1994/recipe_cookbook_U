import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

    // created this service to see the differences of how to load services in various ways

    lastLog: string;

    printLog(message: string){
        console.log(message);
        console.log(this.lastLog)
        this.lastLog = message;
    };

};
