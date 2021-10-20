import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe(
      'Test Recipe', 'This is simply a test', 'https://m.media-amazon.com/images/I/61ign3tLtzL._AC_SX466_.jpg'
    ),
    new Recipe(
      'Test Recipe', 'This is simply a test', 'https://m.media-amazon.com/images/I/61ign3tLtzL._AC_SX466_.jpg'
    )
  ];

  constructor() { }

  ngOnInit(): void {

  }


}
