import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/components/Shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // we pass in the name of the local reference..look inside the HTML file for the INPUT
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  // NOTE: that the object passed thru is the same as model - so we replace to make it simplier
  // OLD: <{ name: string, amount: number }>
  // NOTE: it is already an object so only need the reference
  ingredientAdded = new EventEmitter< Ingredient >();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(){
    const ingredientName = this.nameInputRef.nativeElement.value; // obtaining information from input
    const ingredientAmount = this.amountInputRef.nativeElement.value; 
    const newIngredient = new Ingredient(ingredientName, ingredientAmount); // using information to create NEW ingredients
  }

}
