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

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
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
          })
        }
    );
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
