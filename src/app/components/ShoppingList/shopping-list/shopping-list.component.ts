import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../Shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  // recommended practice to store subscription in property => igChangeSub
  private igChangeSub: Subscription;

  constructor( private slService: ShoppingListService ) { };

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();

    // again good practice to have Subscription in variable 
    this.igChangeSub = 
    this.slService.ingredientsChanged.subscribe(
      ( ingredients: Ingredient[] ) => {
        this.ingredients = ingredients;
      }
    );    
  };

  ngOnDestroy(): void {
      // this should be the recommended pattern - variable - subscribe - destroy/unsubscribe
      this.igChangeSub.unsubscribe();
  }

  // here is where we implement our data from the shopping edit component.ts
  onIngredientAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  };

};