import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from '@app/core/models/recipe.model';
import { RecipeService } from '@app/core/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  sub: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.sub = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
