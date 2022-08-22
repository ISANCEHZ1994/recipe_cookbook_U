import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective { 

    // NOTE: if you dont have the public keyword it will be an error
    constructor( public viewContainerRef: ViewContainerRef ){};
  
};
