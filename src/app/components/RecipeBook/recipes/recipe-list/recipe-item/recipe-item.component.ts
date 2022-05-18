import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;

  // replaced/moved to recipe.service.ts!
  // @Output() recipeSelected = new EventEmitter<void>();

  constructor( private recipeService: RecipeService ) { };

  ngOnInit(): void {
    
  };

  onSelected(){
    this.recipeService.recipeSelected.emit(this.recipe);

    // No longer using Output which means no longer needed
    // this.recipeSelected.emit();
  };

};
