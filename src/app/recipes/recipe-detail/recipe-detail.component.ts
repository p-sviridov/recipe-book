import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '@app/core/models/recipe.model';
import { RecipeService } from '@app/core/services/recipe.service';
import { ShoppingListService } from '@app/core/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipeId: number;
  recipe: Recipe;

  constructor(
    private slService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  addToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes']);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.recipeId);
    }) // Angular cleans up this subscription
  }

  ngOnDestroy() {}
}
