import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'app/components/Shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit {
  // we pass in the name of the local reference..look inside the HTML file for the INPUT
  // UPDATE: we are now switching to TD forms! thus we no longer need below!
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef; 

  // NOTE: that the object passed thru is the same as model - so we replace to make it simplier
  // OLD: <{ name: string, amount: number }>
  // NOTE: it is already an object so only need the reference
  // @Output() ingredientAdded = new EventEmitter< Ingredient >();
  // Output so that we can listen/see it from outside - going to ShoppingListCompoHTML

  constructor( private slService: ShoppingListService ) { };

  ngOnInit(): void {
  };

  onAddItem(form: NgForm){
    // const ingredientName   = this.nameInputRef.nativeElement.value; // obtaining information from input
    // const ingredientAmount = this.amountInputRef.nativeElement.value; 
    // const newIngredient    = new Ingredient(ingredientName, ingredientAmount); // using information to create NEW ingredients
    const value = form.value;
    // we are getting the value from HTML file - switching to TD forms so know we make it simpiler
    const newIngredient = new Ingredient( value.name, value.amount ); 
    this.slService.addingIngredient( newIngredient ); 
  };

};
