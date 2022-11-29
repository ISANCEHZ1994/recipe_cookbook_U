import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { LoggingService } from '../../../logging.service';
import { Ingredient } from '../../Shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // ingredients: Ingredient[];
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // recommended practice to store subscription in property => ingChangeSub
  private ingChangeSub: Subscription;

  constructor( 
    private slService: ShoppingListService, 
    private logService: LoggingService,
    // so video shows an error on <:Store> how it was resolved was add genertic brakets
    
    // connecting our reducer/action/ngrx
    private store: Store<
      // we are now replacing with the interface inside of shopping-list.reducer.ts file
      fromShoppingList.AppState
    // NOTE: make sure the {key} is the same name as the key: in app.module in this case ==> shoppingList: shoppingListReducer  
      // shoppingList: {
        // now we need the key: to be the same as the state name inside of shopping-list.reducer
        // ingredients: Ingredient[] // which is going to be an array of ingredients
      // } 
    > 
  ) {};

  ngOnInit(): void {
    // we are using the newly created store (applying NgRx)
    // .select() helps you select a slice of your state 
    // the 'slice' is identified by a string
    // when using the store - it will replace EVERYTHING below!
    this.ingredients = this.store.select('shoppingList'); // it should know what to look for because we have it created above!
    // this.store.select('shoppingList'); would return an observable and so we want to store that observable - set to variable
    // variable causes error because that name is stated at the begining however it is NOT a observable array
    // ingredients: Ingredient[] ==>  ingredients: Observable<{ ingredients: Ingredient[] }>;
    // NOTICE: the same data format as the store
    // NOTICE: since we are changing the data, expect an error inside the shopping-list.compo.html 
    // the error happens because ngFor/let of loop is specifically for ARRAYS only thus we add the ASYNC PIPES

    // Remember since we are swtiching to NgRX we are replacing the (two functions) below!
    // this.ingredients = this.slService.getIngredients();

    // again good practice to have Subscription in variable
    // this.ingChangeSub = 
    // this.slService.ingredientsChanged.subscribe(
    //   ( ingredients: Ingredient[] ) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.logService.printLog("hello from shopping-list component - NgOnit")
  };

  ngOnDestroy(): void {
      // this should be the recommended pattern - variable - subscribe - destroy/unsubscribe
      // this.ingChangeSub.unsubscribe();
      // NgRx is smart enough to unsubscribe on its own so no longer needed!
  };

  // related to the startedEditing variable inside of the shopping-list.service
  // function used inside of the shopping-list.component.html
  onEditItem(index: number){
    // this.slService.startedEditing.next(index);
    // using store to dispatch an action - using NgRx
    this.store.dispatch( new ShoppingListActions.StartEdit(index) )
    // remember that in the shopping-list actions we made StartEdit require a payload
  }; 

  // here is where we implement our data from the shopping edit component.ts
  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // };

};