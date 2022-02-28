import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../Shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]; 

  constructor() { };

  ngOnInit(): void {
  };

  // here is where we implement our data from the shopping edit component.ts
  onIngredientAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  };

};