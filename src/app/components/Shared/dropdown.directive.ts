import { HostBinding } from "@angular/core";
import { HostListener } from "@angular/core";
import { Directive } from "@angular/core";

@Directive({
    selector: '[ appDropdown ]',
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;

    // we want this Directive to add some functionality which 
    // will allow us to add certian CSS class to elements dynamiclly 
    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    };

};