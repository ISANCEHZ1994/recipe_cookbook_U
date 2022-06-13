import { Component, OnInit, } from '@angular/core';
// import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [ RecipeService ]
})
export class RecipesComponent implements OnInit {

  // cleaned code to have nothing 
  // now we are using the Subject in one place the SHOPPING LIST 

  constructor(  ) { }

  ngOnInit(): void {
   
  };


}
