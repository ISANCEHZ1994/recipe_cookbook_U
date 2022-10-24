import { 
  Component, 
  OnInit, 
  ViewChild, 
  ElementRef, 
  OnDestroy 
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../../Shared/ingredient.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // we pass in the name of the local reference..look inside the HTML file for the INPUT
  // UPDATE: we are now switching to TD forms! thus we no longer need below!
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef; 

  // NOTE: that the object passed thru is the same as model - so we replace to make it simplier
  // OLD: <{ name: string, amount: number }>
  // NOTE: it is already an object so only need the reference
  // @Output() ingredientAdded = new EventEmitter< Ingredient >();
  // Output so that we can listen/see it from outside - going to ShoppingListCompoHTML

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  // remember that the item we are changing/editing is an Ingredient (model)
  editedItem: Ingredient;
  
  // using information from shopping-edit.component.html
  @ViewChild('f', { static: false }) slForm: NgForm;

  constructor( 
    private slService: ShoppingListService,
    private store: Store<
      fromShoppingList.AppState
      // { shoppingList: { ingredients: Ingredient[] } }
    >
  ) { };

  ngOnInit() {
    // notice that we still use the Shopping List Service or slService!
    // planning to change to use store - NgRx
    this.slService.startedEditing.subscribe(
        ( index: number ) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index); 
 
          this.slForm.setValue({
            name:   this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
    );
  };

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  };

  onSubmit(form: NgForm){ 
    // const ingredientName   = this.nameInputRef.nativeElement.value; // obtaining information from input
    // const ingredientAmount = this.amountInputRef.nativeElement.value; 
    // const newIngredient    = new Ingredient(ingredientName, ingredientAmount); // using information to create NEW ingredients
    
    // Switching to TD (Template-Driven) form so above is not needed anymore
    const value = form.value;
    // we are getting the value.<VARIABLE-NAME> from HTML file
    const newIngredient = new Ingredient( value.name, value.amount ); 
    if( this.editMode ) {
      // Replaced with the store - using NgRx
      // this.slService.updateIngredient( this.editedItemIndex, newIngredient );
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({ index: this.editedItemIndex, ingredient: newIngredient })
      ) 
    } else {  
      // this.slService.addIngredient( newIngredient );
      // we are now DISPATCHING our ACTIONS
      this.store.dispatch(
        // UNDERSTAND THE FLOW of NGRX
        // as soon as we add an ingredient 
        // dispatch the action - can also see in the actions file (shopping-list.actions)
        // to that storage - the NgRX store in the app.module.ts file .forRoot({})
        // that store is aware of the reducers
        new ShoppingListActions.AddIngredient( newIngredient )
      );
    }
    this.editMode = false;
    form.reset(); 
  };

  onClear(){
    this.slForm.reset();
    this.editMode = false;    
  };

  onDelete(){
    // that specfic item will be gone from the list
    // Replacing with store - using NgRx
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient(this.editedItemIndex)
    );
    // might as well clear the inputs
    this.onClear();
  };

};
