import { 
  Component, 
  OnInit, 
  ViewChild, 
  ElementRef, 
  OnDestroy 
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'app/components/Shared/ingredient.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';

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

  constructor( private slService: ShoppingListService ) { };

  ngOnInit() {
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
    // we are getting the value.<VARIABLE> from HTML file
    const newIngredient = new Ingredient( value.name, value.amount ); 
    if( this.editMode ) {
      this.slService.updateIngredient( this.editedItemIndex, newIngredient );
    } else {
      this.slService.addIngredient( newIngredient );
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
    this.slService.deleteIngredient(this.editedItemIndex);
    // might as well clear the inputs
    this.onClear();
  };

};
