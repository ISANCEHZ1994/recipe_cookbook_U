import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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
  ) { };

  ngOnInit(){
    
    this.route.params.subscribe(
      ( params: Params ) => {
        // we are retriving the ID of whatever we are working on - the item/ingredient
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
    console.log(this.recipeForm)
  }

  // Again: below is Reactive Form Templating
  private initForm(){    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if( this.editMode ){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName        = recipe.name;
      recipeImagePath   = recipe.imagePath;
      recipeDescription = recipe.description;
    };

    this.recipeForm = new FormGroup({
      // the string should match the formControlName parameter of the inputs inside of the HTML
      'name'        : new FormControl(recipeName),
      'imagePath'   : new FormControl(recipeImagePath),
      'description' : new FormControl(recipeDescription)
    });
  };
  

};
