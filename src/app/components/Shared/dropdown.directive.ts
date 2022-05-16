import { Directive, HostBinding, HostListener, ElementRef } from "@angular/core";
// import { Directive } from "@angular/core";

@Directive({
    selector: '[appDropdown]',
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;

    // we want this Directive to add some functionality which 
    // will allow us to add certian CSS class to elements dynamiclly 
    // @HostListener('click') toggleOpen(){
    //     this.isOpen = !this.isOpen;
    // };

    // Closing the Dropdown From Anywhere
    // means that a click on one dropdown closes any other one
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    };


    constructor(private elRef: ElementRef){
        
    }

};