import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {};

  ngOnInit(){    
    this.route.params.subscribe(
      ( params: Params ) => {
        // we are retriving the ID of whatever we are working on - the item/recipe
        // remeber that the (+) plus converts into a number
         this.id = +params['id']; // 'id' comes from the app-routing.module.ts because that is the name we have in our DYNAMIC parameter (:id)        
         this.editMode = params['id'] != null; // we want to know whether we are creating a NEW ingredient or EDITING an already created one
         // console.log(this.editMode);
         // running function below to do all work for us!
         this.initForm();        
      }
    )
  };

  onSubmit(){
    // console.log(this.recipeForm)

    // NOTE: our model already has this set up so not needed but an alternative!
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );

    if( this.editMode ){
      this.recipeService.updateRecipe( this.id, this.recipeForm.value );
    } else {
      this.recipeService.addRecipe( this.recipeForm.value );
    }
  };

  // Again: below is Reactive Form Templating
  private initForm(){    
    let recipeName        = '';
    let recipeImagePath   = '';
    let recipeDescription = '';
    // recipeIngredients to create a NEW ingredient (name && amount)
    let recipeIngredients = new FormArray([]); // by default should be an empty array

    if( this.editMode ){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName        = recipe.name;
      recipeImagePath   = recipe.imagePath;
      recipeDescription = recipe.description;

      // checking if we HAVE any ingredients to begin with
      if( recipe['ingredients'] ){                   // if defined
        for( let ingredient of recipe.ingredients ){ // we want to use them - loop thru them
          recipeIngredients.push(                    // push them all into the default array
            new FormGroup({
              // added Validators
              'name'  : new FormControl( ingredient.name, Validators.required ),
              'amount': new FormControl( ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    };
    this.recipeForm = new FormGroup({
        // the string should match the formControlName parameter of the inputs inside of the HTML
        // note: we are also adding Validators to the mix to make sure we have the right datatype
        'name'       : new FormControl(recipeName, Validators.required),
        'imagePath'  : new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': recipeIngredients // should be everything we just pushed to the default array
    });
  }; // initForm CLOSE  

  onAddIngredient(){
      // we are explicityly casting it - basically enclosing the type we want to convert
      (<FormArray>this.recipeForm.get('ingredients'))
      .push(
        new FormGroup({
          // added Validators
          'name'  : new FormControl( null, Validators.required ),
          'amount': new FormControl( null, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      );
  };

  get controls() { // a getter!
      return ( <FormArray>this.recipeForm.get('ingredients') ).controls;
  };

}; // RecipeEditComponent CLOSE
