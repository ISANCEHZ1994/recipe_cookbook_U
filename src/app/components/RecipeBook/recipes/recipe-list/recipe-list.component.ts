import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeThatWasSelected = new EventEmitter<Recipe>();
  
  recipes: Recipe[] = [
    new Recipe(
      'Test Recipe', 'This is simply a test', 'https://m.media-amazon.com/images/I/61ign3tLtzL._AC_SX466_.jpg'
    ),
    new Recipe(
      'Test Recipe2', 'This is simply a test2', 'https://m.media-amazon.com/images/I/61tAdAiR0zL._AC_SX425_.jpg'
    )
  ];

  constructor() { }

  ngOnInit(): void {

  }

  onRecipeSelected(recipe: Recipe){
      this.recipeThatWasSelected.emit(recipe);
  }


}
