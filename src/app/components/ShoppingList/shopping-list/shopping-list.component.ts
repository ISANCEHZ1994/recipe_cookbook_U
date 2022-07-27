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
  // recommended practice to store subscription in property => ingChangeSub
  private ingChangeSub: Subscription;

  constructor( private slService: ShoppingListService ) {};

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();

    // again good practice to have Subscription in variable 
    this.ingChangeSub = 
    this.slService.ingredientsChanged.subscribe(
      ( ingredients: Ingredient[] ) => {
        this.ingredients = ingredients;
      }
    );
  };

  ngOnDestroy(): void {
      // this should be the recommended pattern - variable - subscribe - destroy/unsubscribe
      this.ingChangeSub.unsubscribe();
  };

  // related to the startedEditing variable inside of the shopping-list.service
  // function used inside of the shopping-list.component.html
  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }; 

  // here is where we implement our data from the shopping edit component.ts
  onIngredientAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  };

};